import React from 'react';
import { View } from 'react-native';

// import Reviews from './sections/reviews/reviews-section/ReviewsSection';
import ReviewsList from './sections/reviews/ReviewsList';
import useMediaDetailScreen from './useMediaDetailScreen';
// import HeaderInfo from './header-info/HeaderInfo';
// import Overview from './sections/Overview';
// import Tags from './sections/Tags';
// import ProductionCompanies from './sections/ProductionCompanies';
// import GeneralInfo from './sections/GeneralInfo';
// import PersonList from './person-list/PersonList';
// import Videos from './sections/Videos';

const MediaDetailScreen = (x) => {
  console.log(x.route.params);
  useMediaDetailScreen();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ReviewsList
        reviews={[
          {
            author: 'tmdb38541732',
            content:
              "Not bad for a horror/drama. If you're obsessed with zombie lore and the idea of watching the long-term effects spanning years at a time on an entire cast of characters, then this show is for you. There are a lot of scary parts with zombies eating and the gore and visual effects are award winning, but the show is mostly how people get along with each other during an apocalyptic setting and how they rebuild civilization or just live moment to moment.",
            id: '58b5e04692514119c0000084',
            url: 'https://www.themoviedb.org/review/58b5e04692514119c0000084',
          },
          {
            author: 'lukan87',
            content:
              'Zombie stories and fighting zombies always meant something.Suspans,thriller,horror scenes are exactly what these movies needs.So enjoy watching this!😀',
            id: '59fa28d6925141235700488b',
            url: 'https://www.themoviedb.org/review/59fa28d6925141235700488b',
          },
          {
            author: 'John Smith',
            content:
              "Seasons 1 to 4 were great. It's all downhil from there on - because - you guessed it - diversity and political corectness. In a zombie movie! HAH! Don't watch this.",
            id: '5bc23eab0e0a266e68035ee7',
            url: 'https://www.themoviedb.org/review/5bc23eab0e0a266e68035ee7',
          },
          {
            author: 'Matt',
            content:
              "_The Walking Dead_ is one of those shows you just can't help but love! \r\n\r\nA terrifying story of human survival in an apocalyptic world. The show deals with love, loss, zombies (called 'walkers' on the show), death, destruction and zombies!\r\nAndrew Lincoln, Norman Reedus, Melissa McBride and Lauren Cohan are amongst the star studded cast who deliver **OUTSTANDING** performances in every episode. \r\n\r\n_The Walking Dead_ is consistently thrilling and emotionally resonant, with solid character development and enough blood-splattering gore to satisfy anyone! The comic book counterpart has a big influence on the show, so fans of the comic love it too.\r\n\r\nEach season gives enough compelling character moments to reward longtime fans, while maintaining the back-breaking tension and suspense that keeps audiences watching again and again.\r\n\r\n_The Walking Dead_ puts an intelligent spin on the overcrowded zombie subgenre, and each season demonstrates why it's one of the best horror shows on television.",
            id: '5c9f89f4c3a368735b81b985',
            url: 'https://www.themoviedb.org/review/5c9f89f4c3a368735b81b985',
          },
          {
            author: 'MovieGuys',
            content:
              'The walking Dead is in once sense a metaphor for whats happened to this once great show. \r\n\r\nThe originality of the first few seasons has gradually given way to a repetitiousness that tells me the show might still be shuffling along but its long since dead.\r\n\r\nThe departure of Andrew Lincoln was a sign that things had come full circle and I had thought they would wind it up which, in my view, would have been the sensible thing to do.\r\n\r\nStill watching but only because I want to see where it ends. If indeed it ends. Moderately watchable. 6/10 from me.',
            id: '5ca286e6c3a3682b210fe633',
            url: 'https://www.themoviedb.org/review/5ca286e6c3a3682b210fe633',
          },
          {
            author: 'lynalouisa',
            content:
              'unique! perfect show, and more if you focus on the psycologie and sociologie side! in constant evoluion... even if after season 4 or 6 we can see deterioration with the quality and building storyline; we can enjoy a clear amelioration for the best in the 8th season opening our mind to a new vision of the series ! \r\nit"s a free adaptation from a popular american comic! and it"s a pleasure to see this worl in black mirors ;)',
            id: '5d1f535355b0c0678f6e18b7',
            url: 'https://www.themoviedb.org/review/5d1f535355b0c0678f6e18b7',
          },
          {
            author: 'Dean09199',
            content:
              "I used to love this TV show. First few seasons were great. It was exactly about zombies, but later (after Governor era) they turned one of my favorite TV shows into cheap, boring action series. It's so prolonged, that it became soap opera. It's time to end this jumbled mess. Please end it already and liberate us from this boredom.",
            id: '5d63e4b26dea3a600c936181',
            url: 'https://www.themoviedb.org/review/5d63e4b26dea3a600c936181',
          },
        ]}
      />
    </View>
  );
};

export default MediaDetailScreen;

/**
 * <ScrollView>
        <HeaderInfo
          thumbnailURL="https://image.tmdb.org/t/p/w92/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg"
          voteCount={123}
          posterURL="/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg"
          imageURL="https://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg"
          votesAverage={8.3}
          title="Vingadores: Guerra Infinita"
        />
        <Tags
          tags={['Action & Adventure', 'Drama', 'Sci-Fi & Fantasy']}
          releaseYear="2014"
        />
        <Overview />
      </ScrollView>
 * <ProductionCompanies
        productionCompanies={[
          {
            id: '2',
            logoPath: '/wdrCwmRnLFJhEoH8GSfymY85KHT.png',
            name: 'Walt Disney Pictures',
            originCountry: 'US',
          },
          {
            id: '14714',
            logoPath: '/oQHaOZEnPzlJACVTisV0FICrS82.png',
            name: 'China Film Group Corporation',
            originCountry: 'CN',
          },
          {
            id: '103698',
            logoPath: '/qS01bSMe274ecTdrgyO3BBvzfKK.png',
            name: 'Good Fear',
            originCountry: 'US',
          },
          {
            id: '89254',
            logoPath: null,
            name: 'Jason T. Reed Productions',
            originCountry: 'US',
          },
        ]}
      />
 *

       <GeneralInfo
        infoItems={[
          {
            title: 'Original Language',
            value: 'Celebrate',
          },
          {
            title: 'Budget',
            value: '-',
          },
        ]}
      />
 */
