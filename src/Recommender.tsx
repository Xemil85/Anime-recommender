import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Anime {
    name: string,
    picture: string,
    type: string,
    episodes: number,
    genres?: string[],
    status: string
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
    min-height: 100vh;
`;

const AnimeCard = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 500px;
    text-align: center;
    margin-bottom: 20px;
`;

const AnimeImage = styled.img`
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
`;

const AnimeInfo = styled.p`
    font-size: 1.1em;
    color: #666;
    margin: 5px 0;
`;

const Button = styled.button`
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Recommender = () => {
    const [anime, setAnime] = useState<Anime | null>(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/random/anime`);
            const data = response.data.data

            const newAnime: Anime = {
                name: data.title,
                picture: data.images.jpg.image_url,
                type: data.type,
                episodes: data.episodes,
                genres: data.genres ? data.genres.map((genre: { name: string }) => genre.name) : undefined,
                status: data.status
            }
            setAnime(newAnime);
            console.log(data);
        } catch (error) {
            console.error('There was an error fetching the anime data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <AnimeCard>
                <AnimeImage src={anime?.picture} />
                <AnimeInfo><b>Title:</b> {anime?.name}</AnimeInfo>
                <AnimeInfo><b>Type:</b> {anime?.type}</AnimeInfo>
                <AnimeInfo><b>Episodes:</b> {anime?.episodes}</AnimeInfo>
                <AnimeInfo><b>Status:</b> {anime?.status}</AnimeInfo>
                <AnimeInfo><b>Genres:</b> {anime?.genres && anime.genres.length > 0 ? (
                    anime?.genres.join(', ')
                ) : (
                    "-"
                )}</AnimeInfo>
                <Button onClick={() => fetchData()}>Suggest new anime</Button>
            </AnimeCard>
        </Container>
    )
}

export default Recommender