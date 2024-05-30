import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Card } from 'react-native-paper';
import Header from './components/Header';

const { width: screenWidth } = Dimensions.get('window');

const FavoritesContext = createContext();

const HomeScreen = () => {
  return (
    <View style={styles.containerScreen}>
      <ScrollView style={styles.scroll}>
        <UsingArrayList />
      </ScrollView>
    </View>
  );
};
const AboutScreen = () => (
  <View style={styles.containerScreen}>
    <View style={{height:'80%',rowGap:90, marginHorizontal:20}}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        About my app
      </Text>
      <Text
      style={{
          textAlign: 'center',
          fontSize: 20,
          fontStyle:'italic'
        }}>
      Welcome to WishDish, your ultimate culinary companion! Discover a vast collection of recipes from around the world, complete with step-by-step instructions and nutritional information. Personalize your experience with tailored recommendations and save your favorite recipes for easy access. Join a vibrant community of food enthusiasts to share, rate, and review recipes. Enhance your cooking skills with expert tips and tricks. Enjoy the convenience of offline access and regular updates to keep your culinary journey exciting.
      </Text>
    </View>
  </View>
);

const FavoritesScreen = () => {
  const { favoriteMeals } = useContext(FavoritesContext);

  return (
    <View style={styles.containerScreen}>
      <ScrollView style={styles.scroll}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Favourite meals
        </Text>
        {favoriteMeals.map((item, index) => (
          <FavouriteCard key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const UsingArrayList = () =>
  meals.map((item, index) => <MealCard key={index} item={item} />);

const MealCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(item.liked); // Инициализировать liked из элемента
  const { favoriteMeals, addFavoriteMeal, removeFavoriteMeal } =
    useContext(FavoritesContext);

  const handleLikePress = () => {
    setLiked(!liked);
    if (!liked) {
      addFavoriteMeal({ ...item, liked: true }); // Передать liked при добавлении в избранное
    } else {
      removeFavoriteMeal(item);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card style={styles.cards}>
      <View style={styles.cardRow}>
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <View style={styles.cardMainColumn}>
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.cardHeading}>{item.strMeal}</Text>
          </TouchableOpacity>
          <Text style={styles.cardMain}>{item.strCategory}</Text>
          <Text style={styles.cardMain}>{item.strArea}</Text>
          <TouchableOpacity onPress={handleLikePress}>
            <Image
              style={styles.cardLike}
              source={
                liked
                  ? require('./assets/Liked.png')
                  : require('./assets/Like.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        {item.ingredients.map((el, index) => (
          <Text key={index} style={styles.cardIngredient}>
            {el}
          </Text>
        ))}
      </View>

      {/* Модальное окно */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text style={styles.cardHeading}>{item.strMeal}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={{ color: 'red' }}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text>{item.strInstructions}</Text>
          {Platform.OS === 'android' && (
            <TouchableNativeFeedback
              onPress={closeModal}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'blue',
                  borderRadius: 5,
                }}>
                <Text style={{ color: 'white' }}>Close modal on Android</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </Modal>
    </Card>
  );
};

const FavouriteCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card style={styles.cards}>
      <View style={styles.cardRow}>
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <View style={styles.cardMainColumn}>
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.cardHeading}>{item.strMeal}</Text>
          </TouchableOpacity>
          <Text style={styles.cardMain}>{item.strCategory}</Text>
          <Text style={styles.cardMain}>{item.strArea}</Text>
          <Image
            style={styles.cardLike}
            source={require('./assets/Liked.png')}
          />
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        {item.ingredients.map((el, index) => (
          <Text key={index} style={styles.cardIngredient}>
            {el}
          </Text>
        ))}
      </View>

      {/* Модальное окно */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text style={styles.cardHeading}>{item.strMeal}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={{ color: 'red' }}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text>{item.strInstructions}</Text>
          {Platform.OS === 'android' && (
            <TouchableNativeFeedback
              onPress={closeModal}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'blue',
                  borderRadius: 5,
                }}>
                <Text style={{ color: 'white' }}>Close modal on Android</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </Modal>
    </Card>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  const addFavoriteMeal = (meal) => {
    if (!favoriteMeals.some((favMeal) => favMeal.idMeal === meal.idMeal)) {
      setFavoriteMeals([...favoriteMeals, meal]);
    }
  };

  const removeFavoriteMeal = (meal) => {
    const updatedFavorites = favoriteMeals.filter(
      (favMeal) => favMeal.idMeal !== meal.idMeal
    );
    setFavoriteMeals(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteMeals, addFavoriteMeal, removeFavoriteMeal }}>
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#227C9D',
                borderTopWidth: 0,
                height: 66,
              },
            }}
            tabBarOptions={{
              showLabel: false,
            }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={require('./assets/Home.png')}
                    style={{ tintColor: focused ? '#FFCB77' : '#ccc' }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={require('./assets/About.png')}
                    style={{ tintColor: focused ? '#FFCB77' : '#ccc' }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={require('./assets/Heart.png')}
                    style={{ tintColor: focused ? '#FE6D73' : '#ccc' }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}

const meals = [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions:
      'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
    ingredients: ['Lentils', 'Onion', 'Carrots'],
    measures: ['1 cup ', '1 large', '1 large'],
  },
  {
    idMeal: '53026',
    strMeal: 'Tamiya',
    strCategory: 'Vegetarian',
    strArea: 'Egyptian',
    strInstructions:
      'oak the beans in water to cover overnight.Drain. If skinless beans are unavailable, rub to loosen the skins, then discard the skins. Pat the beans dry with a towel.\r\nGrind the beans in a food mill or meat grinder.If neither appliance is available, process them in a food processor but only until the beans form a paste. (If blended too smoothly, the batter tends to fall apart during cooking.) Add the scallions, garlic, cilantro, cumin, baking powder, cayenne, salt, pepper, and coriander, if using.  Refrigerate for at least 30 minutes.\r\nShape the bean mixture into 1-inch balls.Flatten slightly and coat with flour.\r\nHeat at least 1½-inches of oil over medium heat to 365 degrees.\r\nFry the patties in batches, turning once, until golden brown on all sides, about 5 minutes.Remove with a wire mesh skimmer or slotted spoon. Serve as part of a meze or in pita bread with tomato-cucumber salad and tahina sauce.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
    strTags: null,
    ingredients: ['Broad Beans', 'Spring Onions', 'Garlic Clove'],
    measures: ['3 cups ', '6', '4'],
  },
  {
    idMeal: '52844',
    strMeal: 'Lasagne',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strInstructions:
      'Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\nAdd the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\nStir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\nHeat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\nPut the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
    strTags: null,
    ingredients: ['Olive Oil', 'Bacon', 'Onion'],
    measures: ['1 tblsp ', '2', '1 finely chopped '],
  },
  {
    idMeal: '52971',
    strMeal: 'Kafteji',
    strCategory: 'Vegetarian',
    strArea: 'Tunisian',
    strInstructions:
      'Peel potatoes and cut into 5cm cubes.\r\nPour 1-2 cm of olive oil into a large pan and heat up very hot. Fry potatoes until golden brown for 20 minutes, turning from time to time. Place on kitchen paper to drain.\r\nCut the peppers in half and remove seeds. Rub a little olive oil on them and place the cut side down on a baking tray. Place them under the grill. Grill until the skin is dark and bubbly. While the peppers are still hot, put them into a plastic sandwich bag and seal it. Take them out after 15 minutes and remove skins.\r\nIn the meantime, heat more olive oil another pan. Peel the onions and cut into thin rings. Fry for 15 minutes until golden brown, turning them often. Add the Ras el hanout at the end.\r\nCut the pumpkin into 5cm cubes and fry in the same pan you used for the potatoes for 10-15 minutes until it is soft and slightly browned. Place on kitchen paper.\r\nPour the remaining olive oil out of the pan and put all the cooked vegetables into the pan and mix. Whisk eggs and pour them over the vegetables. Put the lid on the pan so that the eggs cook. Put the contents of the pan onto a large chopping board, add salt and pepper and chopped and mix everything with a big knife.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
    strTags: null,
    ingredients: ['Potatoes', 'Olive Oil', 'Green Pepper'],
    measures: ['5 Large', '2 tbs', '1'],
  },
  {
    idMeal: '52785',
    strMeal: 'Dal fry',
    strCategory: 'Vegetarian',
    strArea: 'Indian',
    strInstructions:
      'Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    strTags: 'Curry,Vegetarian,Cake',
    ingredients: ['Toor dal', 'Water', 'Salt'],
    measures: ['1 cup', '2-1/2 cups', '1 tsp'],
  },
  {
    idMeal: '53013',
    strMeal: 'Big Mac',
    strCategory: 'Beef',
    strArea: 'American',
    strInstructions:
      'For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog.',
    strMealThumb:
      'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    strTags: null,
    ingredients: ['Minced Beef', 'Olive Oil', 'Sesame Seed Burger Buns'],
    measures: ['400g', '2 tbs', '2'],
  },
];

const styles = StyleSheet.create({
  cardHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cardMain: {
    fontSize: 20,
  },
  cardIngredient: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  cardLike: {
    marginLeft: 'auto',
    height: 32,
    width: 36,
    resizeMode: 'cover',
  },
  cardMainColumn: {
    justifyContent: 'space-between',
    width: screenWidth - 240,
  },
  container: {
    flex: 1,
  },
  containerScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FEF9EF',
  },
  image: {
    width: 141,
    height: 143,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  cardRow: {
    flexDirection: 'row',
    columnGap: 14,
  },
  cards: {
    marginVertical: 35,
    marginHorizontal: 34,
    borderWidth: 2,
    borderColor: '#FFCB77',
    borderRadius: 20,
  },
  ingredientsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 24,
    marginHorizontal: 12,
    rowGap: 12,
    justifyContent: 'space-between',
  },
});
