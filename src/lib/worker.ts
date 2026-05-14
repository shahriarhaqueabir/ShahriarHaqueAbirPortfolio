import { pipeline, env, TextGenerationPipeline } from '@huggingface/transformers';

// Skip local model check since we are running in a browser
env.allowLocalModels = false;

class PipelineSingleton {
    static task = 'text-generation';
    static model = 'HuggingFaceTB/SmolLM2-135M-Instruct';
    static instance: TextGenerationPipeline | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getInstance(progress_callback?: any) {
        if (this.instance === null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.instance = await pipeline(this.task as any, this.model, { 
                progress_callback,
                device: 'webgpu' // Will fallback to wasm if webgpu isn't available
            }) as TextGenerationPipeline;
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event: MessageEvent) => {
    const { messages } = event.data;

    try {
        // Load the model
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const generator = await PipelineSingleton.getInstance((x: any) => {
            self.postMessage({ status: 'progress', data: x });
        });

        // Generate response
        const output = await generator(messages, { 
            max_new_tokens: 256,
            temperature: 0.7,
            do_sample: true,
        });

        self.postMessage({
            status: 'complete',
            output: output
        });
    } catch (err: unknown) {
        const error = err as Error;
        self.postMessage({ status: 'error', error: error.message });
    }
});
