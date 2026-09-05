import CircularSplitRoll from "@/components/ui/circular-split-roll";

const interestItems = [
   {
    id: "GOT",
    title: "Game of Thrones",
    subtitle: "Ser Jaime Lannister",
    date: "2024",
    mainImage: "https://m.media-amazon.com/images/M/MV5BYTRiNDYzZjEtZGEyNy00M2I3LWE2NjktNzIyZjgxOGM5OTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    characterImage: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/game-of-thrones/c/c3/Jaime_lannister_army.jpg",
    alt: "Game of Thrones poster",
  },
   {
    id: "ragnar",
    title: "Vikings",
    subtitle: "King Ragnar Lothbrok",
    date: "2023",
    mainImage: "https://m.media-amazon.com/images/M/MV5BODk4ZjU5ZjYtMzMyMi00ZTVkLTllMzQtZWU1ZjkyMjIzMjcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    characterImage: "https://www.coldland.ca/cdn/shop/files/WhatsApp-Image-2022-08-07-at-10.00.31-PM-1_800x.jpg?v=1761602518",
    alt: "Vikings poster",
  },
  {
    id: "cinematic-ui",
    title: "Mirzapur",
    subtitle: "Guddu Bhaiya",
    date: "2020",
    mainImage: "https://www.dvdplanetstore.pk/wp-content/uploads/2024/01/p0qM8hhlMF5DuxHBzl2EZR6TehX-600x900.jpg",
    characterImage: "https://static.sociofyme.com/thumb/msid-114225509,width-960,height-1280,resizemode-6.cms",
    alt: "Mirzapur poster",
  },
    {
    id: "interaction",
    title: "Breaking Bad",
    subtitle: "Walter Hartwell White",
    date: "2025",
    mainImage: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxZjAtMDk5My00YzQ2LTkwNzYtZDMwZDA1ZWRhODY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    characterImage: "https://i0.wp.com/leadingwithtrust.com/wp-content/uploads/2013/08/walter-white.jpg",
    alt: "Breaking Bad poster",
  },
  {
    id: "Guns",
    title: "Guns and Gulaabs",
    subtitle: "Paanaa Tipu",
    date: "2022",
    mainImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_njUXMkJIY7hGDawQ12XcIkCxxkPg1AbYeZTSxC_yZkcjYhMm4bruOnPR&s=10",
    characterImage: "https://www.hindustantimes.com/ht-img/img/2023/12/28/1600x900/guns_and_gulaabs_1703753010473_1703753014750.jpg",
    alt: "Guns and Gulaabs poster",
  },
     {
    id: "interaction",
    title: "Hostel Daze",
    subtitle: "Rupesh Bhaati (Jaat)",
    date: "2025",
    mainImage: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxZjAtMDk5My00YzQ2LTkwNzYtZDMwZDA1ZWRhODY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    characterImage: "https://i.ytimg.com/vi/HJquiraoM8c/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAxF9B4oTmKJYiWW5a-gwze3LRDpA&usqp=CCk",
    alt: "Breaking Bad poster",
  },
  {
    id: "webgl",
    title: "FROM",
    subtitle: "Jade Herrera",
    date: "2025",
    mainImage: "https://static.tvmaze.com/uploads/images/original_untouched/406/1015898.jpg",
    characterImage: "https://static.tvmaze.com/uploads/images/medium_portrait/397/993167.jpg",
    alt: "FROM poster",
  },
 


];

export default function CircularSplitRollSection() {
  return (
    <CircularSplitRoll
      items={interestItems}
      radius={500}
      cardSize={205}
      sectionHeight={100}
      textSideScale={0.68}
      textSideOpacity={0.18}
      background="#BF0911"
      titleColor="#fff7f4"
      className="grain-bg"
      gridTitleClassName="invert custom-text2 uppercase"
      gridSubtitleClassName="text-left"
    />
  );
}
