import { apiUrl } from "../../constants/apiUrl";

export async function fetchData(page, setCharacters) {
    const data = await fetch(apiUrl(page));
    data.json()
        .then((res) => {
            res = res.filter(
                (char) =>
                    char.name.length > 1 && char.titles.length > 1 && char.born.length > 1 && char.aliases.length > 1
            );
            const randomNum = Math.ceil(Math.random() * res.length);
            setCharacters((prevCharacters) => [...prevCharacters, res[randomNum - 1]]);
        })
        .catch((err) => console.log(err));
}
