import { useState } from "react";
import Filtration from "../../components/Filtration/Filtration";
import HeroContent from "./HeroContent/HeroContent";
import ListBooks from "./ListBooks/ListBooks";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState({
    name: "Wszystkie",
    id: "allGenres",
  });
  const [currentPage, setCurrentPage] = useState(0);

  const onGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(0);
    console.log(`onGenreChange`, genre);
  };
  const onPageChange = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <HeroContent />
      <Filtration onGenreChange={onGenreChange} />
      <ListBooks
        currentPage={currentPage}
        selectedGenre={selectedGenre}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Home;
