export {};

function firstOperation(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Первая операция завершена.');
            resolve('Результат первой операции');
        }, 500);
    });
}

function secondOperation(): Promise<string> {
    return new Promise((_resolve, reject) => {
        setTimeout(() => {
            // Эта операция намеренно завершается с ошибкой.
            reject(new Error('Вторая операция завершилась с ошибкой.'));
        }, 800);
    });
}

function thirdOperation(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Третья операция завершена.');
            resolve('Результат третьей операции');
        }, 1200);
    });
}

async function runParallelOperations(): Promise<void> {
    // Все функции вызываются сразу, поэтому таймеры работают параллельно.
    const promises = [
        firstOperation(),
        secondOperation(),
        thirdOperation()
    ];

    try {
        // При отклонении одного промиса управление перейдёт в catch.
        const results = await Promise.all(promises);

        // В этом примере строка не выполнится из-за намеренной ошибки.
        console.log('Все результаты:', results);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(
                'Ошибка при выполнении параллельных операций:',
                error.message
            );
        } else {
            console.error('Неизвестная ошибка:', error);
        }

        // Ошибка здесь предусмотрена условием задания.
        // Поэтому она не считается ошибкой запуска всей домашней работы.
    } finally {
        // Promise.all не отменяет остальные операции после reject.
        // Дожидаемся их завершения перед выходом из функции.
        await Promise.allSettled(promises);

        console.log('Все запущенные операции завершились.');
    }
}

await runParallelOperations();