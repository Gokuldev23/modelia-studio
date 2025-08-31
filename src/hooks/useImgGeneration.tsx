import { useCallback, useRef, useState } from "react";
import { imageGenApi } from "../apis/imgGenApi";
import type { Generation } from "../js/types";

export function useImgGeneration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);
    const [attempt,setAttempt] = useState(0)

    const generate = useCallback(
        async (payload: {
            imageDataUrl: string;
            prompt: string;
            style: string;
        }): Promise<Generation> => {
            setLoading(true);
            setError(null);
            controllerRef.current?.abort();
            const controller = new AbortController();
            controllerRef.current = controller;

            const maxAttempts = 3;
            let atmpt = 0;
            setAttempt(atmpt)
            let lastErr: unknown = null;

            while (atmpt < maxAttempts) {
                console.log({ attempt });
                try {
                    const result = await imageGenApi({
                        ...payload,
                        signal: controller.signal,
                    });
                    setLoading(false);
                    return result;
                } catch (err: unknown) {
                    if (
                        err &&
                        typeof err === "object" &&
                        "name" in err &&
                        (err as { name?: string }).name === "AbortError"
                    ) {
                        setLoading(false);
                        setError("Aborted");
                        throw err;
                    }
                    lastErr = err;
                    atmpt++;
                    setAttempt(atmpt)
                    if (attempt >= maxAttempts) {
                        break;
                    }
                    const backoff = 500 * Math.pow(2, attempt - 1);
                    await new Promise((r) => setTimeout(r, backoff));
                }
            }

            setLoading(false);
            let message = "Unknown error";
            if (
                lastErr &&
                typeof lastErr === "object" &&
                "message" in lastErr &&
                typeof (lastErr as { message?: unknown }).message === "string"
            ) {
                message = (lastErr as { message: string }).message;
            }
            setError(message);
            throw lastErr;
        },
        []
    );

    const abort = useCallback(() => {
        controllerRef.current?.abort();
        controllerRef.current = null;
        setLoading(false);
        setError("Aborted");
    }, []);

    return { generate, loading, error, abort, attempt };
}
