// Типизация аниме
export interface Anime {
    mal_id: number;
    title: string;
    image_url: string;
    score: number;
    favorites: number;
    episodes: number;
    rating: string;
    start_date: string;
    end_date: string;
    synopsis: string;
    genres: Genre[];
    producers: Producer[];
    }

    // Типизация жанра
    export interface Genre {
    mal_id: number;
    name: string;
    }

    // Типизация продюсера
    export interface Producer {
    mal_id: number;
    name: string;
    }

    // Ответ от API для списка аниме
    export interface AnimeListResponse {
    data: Anime[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
    };
}