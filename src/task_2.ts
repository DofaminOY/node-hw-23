export {};

// Обрабатываем одну строку с указанной задержкой.
function uppercaseWithDelay(
    text: string,
    delayMs: number
): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = text.toUpperCase();

            console.log(`Обработана строка: ${result}`);
            resolve(result);
        }, delayMs);
    });
}

// readonly означает, что функция не изменяет исходный массив.
async function processStrings(
    strings: readonly string[]
): Promise<string[]> {
    // Проверяем элементы до запуска таймеров.
    if (!strings.every((text) => typeof text === 'string')) {
        throw new TypeError('Все элементы массива должны быть строками.');
    }

    // map сразу запускает обработку каждого элемента.
    // Задержки для примера: 500, 700 и 900 мс.
    const promises = strings.map((text, index) =>
        uppercaseWithDelay(text, 500 + index * 200)
    );

    // Ожидаем завершения всех операций.
    const results = await Promise.all(promises);

    console.log('Все результаты:', results);

    // Возвращаем массив для дальнейшего использования.
    return results;
}

async function main(): Promise<void> {
    const strings = ['node.js', 'typescript', 'async/await'];

    console.log('Исходный массив:', strings);
    console.time('Время обработки строк');

    try {
        await processStrings(strings);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Ошибка обработки строк:', error.message);
        } else {
            console.error('Неизвестная ошибка:', error);
        }

        process.exitCode = 1;
    } finally {
        console.timeEnd('Время обработки строк');
    }
}

await main();