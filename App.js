import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function App() {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[{ backgroundColor: "white", flex: 1 }, rStyle]}
        />
      </PanGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
});
