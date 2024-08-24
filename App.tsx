import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Define a type for the dice images object
type DiceImages = {
  [key: string]: any; // Use 'any' to accommodate the require statements
};

// Import all dice images
const diceImages: DiceImages = {
  1: require('./public/dice-1.png'),
  2: require('./public/dice-2.png'),
  3: require('./public/dice-3.png'),
  4: require('./public/dice-4.png'),
  5: require('./public/dice-5.png'),
  6: require('./public/dice-6.png'),
};

const App: React.FC = () => {
  // State for button press
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // State for dice number
  const [number, setNumber] = useState<string>("1");

  // Function to roll the dice
  const rollDice = (): void => {
    const randomNumber = (Math.floor(Math.random() * 6) + 1).toString();
    setNumber(randomNumber);

    // Haptic feedback options
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    };

    // Check platform and trigger haptic feedback if supported
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      ReactNativeHapticFeedback.trigger('impactHeavy', options);
    } else {
      console.log('Haptic feedback not supported on this platform.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainStuff}>
        <View>
          <Image source={diceImages[number]} style={styles.diceImage} />
        </View>
        <Pressable
          onPressIn={() => {
            setIsPressed(true);
            rollDice();
          }}
          onPressOut={() => setIsPressed(false)}
          style={({ pressed }) => [
            styles.button,
            pressed || isPressed ? styles.buttonPressed : styles.buttonDefault,
          ]}
        >
          <Text style={isPressed ? styles.buttonTextPressed : styles.buttonText}>Roll</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D6223A',
    marginTop: 10,
    width: 250,
  },
  buttonDefault: {
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    backgroundColor: '#D6223A',
  },
  buttonText: {
    color: '#D6223A',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextPressed: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  mainStuff: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
