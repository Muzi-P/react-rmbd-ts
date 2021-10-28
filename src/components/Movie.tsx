import React from "react";
// config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// components
import BreadCrumb from "./BreadCrumb";
import Spinner from "./Spinner";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
import Grid from "./Grid";
// image
import NoImage from "../images/no_image.jpg";

// hooks
import useMovieFetch from "../hooks/useMovieFetch";
import { useParams } from "react-router";
import MovieInfo from "./MovieInfo";

const Movie: React.FC = () => {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(Number(movieId));
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
