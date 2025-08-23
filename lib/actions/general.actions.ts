"use server"

import { feedbackSchema } from "@/constants";
import { auth, db } from "@/firebase/admin";
import { google, createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { success } from "zod";

export async function getInterviewByUserId(userId: string) : Promise<Interview[] | null> {
    const interviews = await db.collection('interviews').where('userId', '==', userId).orderBy('createdAt', 'desc').get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams) : Promise<Interview[] | null> {
    const {userId, limit=20} = params;
    const interviews = await db.collection('interviews').where('finalized', '==', true).where('userId', '!=', userId).orderBy('createdAt', 'desc').limit(limit).get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

export async function getInterviewById(id: string) : Promise<Interview | null> {
    const interview = await db.collection('interviews').doc(id).get();

    return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001" ),
      schema: feedbackSchema,
      prompt: `
You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. 
Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

Transcript:
${formattedTranscript}

Important:
- Only use the following exact category names (do not rename, shorten, or add new ones):
  1. Communication Skills
  2. Technical Knowledge
  3. Problem Solving
  4. Cultural & Role Fit
  5. Confidence & Clarity

For each category, provide:
- score (0–100)
- comment (detailed evaluation, including positives and negatives)

Then provide:
- strengths (bullet points)
- areasForImprovement (bullet points)
- finalAssessment (short paragraph)

Do not add or change category names. Stick to the exact names above.
`,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams) : Promise<Feedback | null> {
    const {interviewId, userId} = params;
    const feedback = await db.collection('feedback').where('interviewId', '==', interviewId).where('userId', '==', userId).limit(1).orderBy('createdAt', 'desc').get();

    if(feedback.empty) {
        return null;
    }

    const feedbackDoc = feedback.docs[0];

    return {
        id: feedbackDoc.id,
        ...feedbackDoc.data(),
    } as Feedback   

}