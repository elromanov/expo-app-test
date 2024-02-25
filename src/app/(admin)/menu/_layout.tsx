import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/constants/Colors';

export default function MenuStack() {
    return <Stack screenOptions={{

    }}>
        <Stack.Screen 
            name="index"
            options={
                {title: 'Menu',
                headerRight: () => (
                  <Link href="/(admin)/menu/create" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="plus-square-o"
                          size={25}
                          color={Colors.light.tint}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),}
            }
        />

<Stack.Screen 
            name="[id]"
            options={
                {title: 'Menu',
                headerRight: () => (
                  <Link href="/" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="pencil-square-o"
                          size={25}
                          color={Colors.light.tint}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),}
            }
        />
    </Stack>;
}