export {};

// Максимальная задержка одного таймера Node.js.
const MAX_DELAY_MS = 2_147_483_647;

async function processDelays(
    delays: readonly number[]
): Promise<number[]> {
    // Проверяем весь массив до создания таймеров.
    // В этой реализации используем целые неотрицательные миллисекунды.
    for (const delayMs of delays) {
        if (
            !Number.isInteger(delayMs) ||
            delayMs < 0 ||
            delayMs > MAX_DELAY_MS
        ) {
            throw new RangeError(
                `Задержка должна быть целым числом от 0 до ${MAX_DELAY_MS} мс. Получено: ${delayMs}`
            );
        }
    }

    // Каждое число задаёт задержку отдельного промиса.
    const promises = delays.map((delayMs) => {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                console.log(`Завершён промис с задержкой ${delayMs} мс.`);

                // Результатом промиса будет исходное число.
                resolve(delayMs);
            }, delayMs);
        });
    });

    // Все таймеры уже запущены. Ждём их завершения.
    const results = await Promise.all(promises);

    console.log('Все результаты:', results);

    return results;
}

async function main(): Promise<void> {
    const delays = [1000, 500, 1500];

    console.log('Исходные задержки:', delays);
    console.time('Время выполнения всех таймеров');

    try {
        await processDelays(delays);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка обработки задержек:', error.message);
        } else {
            console.error('Неизвестная ошибка:', error);
        }

        process.exitCode = 1;
    } finally {
        console.timeEnd('Время выполнения всех таймеров');
    }
}

await main();