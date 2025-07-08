import { NextRequest } from 'next/server';
import { generateStoryboard, saveLead, StoryboardRequest } from '@/lib/ai';
import { getTranslations } from 'next-intl/server';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();
  
  try {
    const body: StoryboardRequest = await request.json();
    
    // Get locale from request headers or default to 'en'
    const locale = request.headers.get('x-locale') || 'en';
    const t = await getTranslations({ locale, namespace: 'ai' });

    // Validate required fields
    const requiredFields = [
      'projectType', 'industry', 'targetAudience', 'brandName',
      'productDescription', 'keyMessage', 'tone', 'duration', 'budget'
    ] as const;

    for (const field of requiredFields) {
      if (!body[field as keyof StoryboardRequest]) {
        const errorData = JSON.stringify({
          type: 'error',
          error: `Missing required field: ${field}`
        });
        return new Response(`data: ${errorData}\n\n`, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }
    }

    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Step 1: Analyzing project requirements
          const progressData1 = JSON.stringify({
            type: 'progress',
            step: 1,
            totalSteps: 4,
            message: t('generator.loading.steps.analyzing'),
            progress: 25
          });
          controller.enqueue(encoder.encode(`data: ${progressData1}\n\n`));

          // Step 2: Creating storyboard content
          const progressData2 = JSON.stringify({
            type: 'progress',
            step: 2,
            totalSteps: 4,
            message: t('generator.loading.steps.creating'),
            progress: 50
          });
          controller.enqueue(encoder.encode(`data: ${progressData2}\n\n`));

          // Step 3: Generating visual concepts
          const progressData3 = JSON.stringify({
            type: 'progress',
            step: 3,
            totalSteps: 4,
            message: t('generator.loading.steps.generating'),
            progress: 75
          });
          controller.enqueue(encoder.encode(`data: ${progressData3}\n\n`));

          // Generate storyboard using AI with locale
          const storyboard = await generateStoryboard(body, locale);

          // Step 4: Finalizing storyboard
          const progressData4 = JSON.stringify({
            type: 'progress',
            step: 4,
            totalSteps: 4,
            message: t('generator.loading.steps.finalizing'),
            progress: 100
          });
          controller.enqueue(encoder.encode(`data: ${progressData4}\n\n`));

          // Save lead information
          await saveLead(body, storyboard);

          // Send completion data
          const completeData = JSON.stringify({
            type: 'complete',
            storyboard,
            message: t('generator.success')
          });
          controller.enqueue(encoder.encode(`data: ${completeData}\n\n`));

        } catch (error) {
          console.error('Error in storyboard generation:', error);
          const errorData = JSON.stringify({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in storyboard generation API:', error);
    const errorData = JSON.stringify({
      type: 'error',
      error: 'Failed to generate storyboard',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
    return new Response(`data: ${errorData}\n\n`, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
} 