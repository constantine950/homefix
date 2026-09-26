// app/(provider)/setup/availability.tsx
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../lib/context/AuthContext";

const SERVICES = [
  "Plumber",
  "Electrician",
  "Painter",
  "Carpenter",
  "Cleaner",
  "Tiler",
];
const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export default function AvailabilityScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [useAsWhatsapp, setUseAsWhatsapp] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

  const isValid =
    selectedService !== null &&
    location.trim().length > 0 &&
    selectedDays.length > 0 &&
    phone.trim().length >= 10;

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  async function handleNext() {
    setLoading(true);
    try {
      // TODO: replace with real API call, e.g. await updateProviderProfile({...})
      await new Promise((resolve) => setTimeout(resolve, 600));

      await updateUser({
        profession: selectedService ?? undefined,
        location,
        availableDays: selectedDays,
        phone,
        whatsapp: useAsWhatsapp ? phone : whatsapp,
        isAvailable: false, // starts unavailable until they explicitly go available
      });

      router.push("/(provider)/setup/proof-of-work");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="px-6"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="flex-row items-center pt-2 mb-4">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center"
            >
              <Feather name="chevron-left" size={20} color="#374151" />
            </Pressable>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Set Availability
          </Text>
          <Text className="text-gray-500 mb-6">
            Show your availability to customers in your area
          </Text>

          <View className="bg-gray-100 rounded-2xl p-4 mb-6">
            <Text className="text-gray-900 font-semibold mb-3">
              What do you do?
            </Text>
            <View className="flex-row items-center bg-white rounded-full px-4 h-12 mb-3">
              <Feather name="search" size={16} color="#9CA3AF" />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-2 text-gray-900"
                style={{ paddingVertical: 0 }}
              />
            </View>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-gray-500 text-sm">Select 1 max</Text>
              <Text className="text-primary underline text-sm font-semibold">
                Upgrade
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-2">
              {SERVICES.map((service) => {
                const isSelected = selectedService === service;
                return (
                  <Pressable
                    key={service}
                    onPress={() => setSelectedService(service)}
                    className={`flex-row items-center px-4 py-2 rounded-full border ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={isSelected ? "text-white" : "text-gray-700"}
                    >
                      {service}
                    </Text>
                    {isSelected && (
                      <Feather
                        name="x"
                        size={14}
                        color="#fff"
                        style={{ marginLeft: 6 }}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Text className="text-gray-900 font-semibold mb-2">
            What's your Location?
          </Text>
          <Input
            placeholder="Where's your location"
            value={location}
            onChangeText={setLocation}
            icon="map-pin"
          />

          <Text className="text-gray-900 font-semibold mb-3 mt-2">
            When are you available?
          </Text>
          <View className="flex-row flex-wrap gap-3 mb-6">
            {DAYS.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <Pressable
                  key={day}
                  onPress={() => toggleDay(day)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-6 h-6 rounded-md mr-2 items-center justify-center border ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <Feather name="check" size={14} color="#fff" />
                    )}
                  </View>
                  <Text className="text-gray-900">{day}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-gray-900 font-semibold mb-2">
            What's your number?
          </Text>
          <Input
            placeholder="Your Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="phone"
          />

          <Pressable
            onPress={() => setUseAsWhatsapp((v) => !v)}
            className="flex-row items-center mb-4"
          >
            <View
              className={`w-5 h-5 rounded mr-2 items-center justify-center border ${
                useAsWhatsapp
                  ? "bg-primary border-primary"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {useAsWhatsapp && <Feather name="check" size={12} color="#fff" />}
            </View>
            <Text className="text-gray-700">Use as whatsApp number</Text>
          </Pressable>

          {!useAsWhatsapp && (
            <>
              <Text className="text-gray-900 font-semibold mb-2">
                Do you use whatsApp?
              </Text>
              <Input
                placeholder="Your whatsApp number"
                value={whatsapp}
                onChangeText={setWhatsapp}
                keyboardType="phone-pad"
                icon="message-circle"
              />
            </>
          )}

          <View className="mt-4">
            <Button
              label="Next"
              onPress={handleNext}
              loading={loading}
              disabled={!isValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
