import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Разбираем JSON из тела запроса.
app.use(express.json());

// GET-маршрут возвращает текст.
app.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('Добро пожаловать в Express-приложение!');
});

// POST-маршрут возвращает полученные данные.
app.post('/data', (req: Request, res: Response): void => {
    if (req.body === undefined) {
        res.status(400).json({
            message: 'Передайте данные в формате JSON.'
        });
        return;
    }

    res.status(200).json({
        message: 'Данные успешно получены.',
        data: req.body
    });
});

// Запускаем сервер вне обработчиков маршрутов.
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});