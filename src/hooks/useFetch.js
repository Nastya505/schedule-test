import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null); // Данные ответа
    const [loading, setLoading] = useState(true); // Индикатор загрузки
    const [error, setError] = useState(null); // Состояние ошибки

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Включаем загрузку
                const response = await axios.get(url); // Выполняем запрос

                // Проверяем, если данные представляют собой строку JSON, парсим её
                let parsedData = response.data;
                if (typeof parsedData === "string") {
                    parsedData = JSON.parse(parsedData); // Десериализация строки в объект
                }

                setData(parsedData); // Сохраняем данные
                setError(null); // Сбрасываем ошибки
            } catch (err) {
                setError(err.message); // Сохраняем сообщение об ошибке
            } finally {
                setLoading(false); // Выключаем загрузку
            }
        };

        fetchData(); // Запуск функции
    }, [url]); // Хук будет вызываться заново только при изменении URL

    return { data, loading, error }; // Возвращаем состояния
};

export default useFetch;
