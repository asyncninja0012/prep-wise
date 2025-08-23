"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {vapi} from '@/lib/vapi.sdk';
import { format } from 'path';
import { interviewer } from '@/constants';
import { createFeedback } from '@/lib/actions/general.actions';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED',
}



interface SavedMessage {
    role: 'user'| 'assistant' | 'system';
    content: string;
}

const Agent = ({userName, userId, type, interviewId, questions}: AgentProps) => {

    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [feedbackRequested, setFeedbackRequested] = useState(false);

    useEffect(() => {
        const onCallStart = () => {
            console.log('[Agent] call-started');
            setCallStatus(CallStatus.ACTIVE);
        };
        const onCallEnd = () => {
            console.log('[Agent] call-ended');
            setCallStatus(CallStatus.FINISHED);
        };

        const onMessage = (message: Message) => {
            if(message.type==='transcript' && message.transcriptType==='final'){
                const newMessage = {role: message.role, content: message.transcript};

                setMessages(prev => [...prev, newMessage]);
            }
        }

        const onSpeakStart = () => setIsSpeaking(true);
        const onSpeakEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.error('Error:', error);

    // Listen for call lifecycle events
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeakStart);
    vapi.on('speech-end', onSpeakEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeakStart);
            vapi.off('speech-end', onSpeakEnd);
            vapi.off('error', onError);
        }

    },[])

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
        // Guard: only proceed if we actually have an interview id
        if(!interviewId){
            console.warn('No interviewId provided, skipping feedback generation.');
            return;
        }
        if (!userId) {
            console.warn('No userId provided, skipping feedback generation.');
            return;
        }
        if (feedbackRequested) {
            console.log('Feedback already requested, skipping duplicate.');
            return;
        }
        setFeedbackRequested(true);
        console.log('Generate Feedback here');

        const { success, feedbackId: id } = await createFeedback({interviewId: interviewId!, userId: userId!, transcript: messages});

        if (success && id) {
            router.push(`/interview/${interviewId}/feedback`);
        } else {
            console.log('Error generating feedback');
            router.push('/');
        }
    };

    // Only attempt feedback generation AFTER the call has finished, for real interview sessions
    useEffect(() => {
        console.log('[Agent] callStatus changed:', callStatus);
        if (callStatus === CallStatus.FINISHED) {
            if (type === 'interview') {
                handleGenerateFeedback(messages);
            } else if (type === 'generate') {
                router.push('/');
            }
        }
    }, [callStatus]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        console.log("Workflow ID (prod check):", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);


        if(type==='generate'){
            await vapi.start(undefined, undefined, undefined,
                process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues: {
                userName: userName,
                userId: userId,
                
            }
    })
        }

        else{
            let formattedQuestions = '';

            if(questions){
                formattedQuestions = questions.map((question)=>`- ${question}`).join('\n');
            }

            await vapi.start(interviewer, {
                variableValues: {
                    questions: formattedQuestions,
                }
            })
        }
        
    }


    const handleDisconnect = async () => {
        // Treat manual disconnect as call end in interview mode
        vapi.stop();
        setCallStatus(type === 'interview' ? CallStatus.FINISHED : CallStatus.INACTIVE);
    }

  const latestMessage = messages[messages.length - 1]?.content;

  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  
  return (
    <>
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className='avatar'>
                    <Image src='/ai-avatar.png' alt='vapi' height={65} width={54} className='object-cover' />
                    {isSpeaking && <span className='animate-speak' />}
                </div>
                <h3>AI Interviewer</h3>
            </div>
            <div className='card-border'>
                <div className='card-content'>
                    <Image src='/user-avatar.png' alt='user' height={540} width={540} className='rounded-full object-cover size-[120px]' />
                    <h3>{userName}</h3>
                </div>
            </div>
        </div>

        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={latestMessage} className={cn('transition-opacitiy duration-500 opacity-0', 'animate-fadeIn opacity-100')}>{latestMessage}</p>
                </div>
            </div>
        )}

        <div className='w-full flex justify-center'>
            {callStatus !== "ACTIVE" ? (
                <button className='relative btn-call' onClick={handleCall}>
                   <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus!=='CONNECTING' && 'hidden')} /> 
                   <span>
                        {isCallInactiveOrFinished? 'Call' : '....'}
                   </span>
                </button>
            ): (
                <button className='btn-disconnect' onClick={handleDisconnect}>
                    Disconnect
                </button>
            )}  
        </div>
    </>
  )

  
  
}

export default Agent
