export {};

// Первая функция возвращает промис с задержкой 1000 мс.
function firstOperation(): Promise<string> {
    console.log('Началась первая операция.');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Первая операция завершена.');
        }, 1000);
    });
}

// Вторая функция возвращает промис с задержкой 500 мс.
function secondOperation(): Promise<string> {
    console.log('Началась вторая операция.');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Вторая операция завершена.');
        }, 500);
    });
}

// Третья функция возвращает промис с задержкой 1500 мс.
function thirdOperation(): Promise<string> {
    console.log('Началась третья операция.');

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Третья операция завершена.');
        }, 1500);
    });
}

async function runSequentially(): Promise<void> {
    console.time('Время последовательного выполнения');

    try {
        // Запускаем первую операцию и ждём её завершения.
        const firstResult = await firstOperation();
        console.log(firstResult);

        // Вторая операция начинается только после первой.
        const secondResult = await secondOperation();
        console.log(secondResult);

        // Третья операция начинается только после второй.
        const thirdResult = await thirdOperation();
        console.log(thirdResult);

        console.log('Цепочка выполнена последовательно.');
    } catch (error: unknown) {
        // Проверяем тип ошибки перед обращением к message.
        if (error instanceof Error) {
            console.error('Ошибка выполнения цепочки:', error.message);
        } else {
            console.error('Неизвестная ошибка:', error);
        }

        process.exitCode = 1;
    } finally {
        // Показываем время и при успехе, и при ошибке.
        console.timeEnd('Время последовательного выполнения');
    }
}

await runSequentially();