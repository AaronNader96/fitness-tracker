import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spacer,
  Button,
  SimpleGrid,
  Input,
  FormControl,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

function Nutrition() {
  const [dailyIntake, setDailyIntake] = useState({});
  const [nutritionGoals, setNutritionGoals] = useState([]);
  const [foodLog, setFoodLog] = useState([]);
  const [newFoodEntry, setNewFoodEntry] = useState({
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [remainingNutrition, setRemainingNutrition] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [editedGoal, setEditedGoal] = useState("");

  useEffect(() => {
    setDailyIntake({
      calories: 2000, // Placeholder value
      protein: 80, // Placeholder value
      carbs: 300, // Placeholder value
      fat: 50, // Placeholder value
    });

    setNutritionGoals([
      { nutrient: "calories", goal: 2500 },
      { nutrient: "protein", goal: 100 },
      { nutrient: "carbs", goal: 350 },
      { nutrient: "fat", goal: 60 },
    ]);

    setFoodLog([]);
  }, []);

  useEffect(() => {
    // Calculate remaining nutrition based on goals and food log
    const totalNutritionFromFood = foodLog.reduce(
      (total, entry) => ({
        calories: total.calories + entry.calories,
        protein: total.protein + entry.protein,
        carbs: total.carbs + entry.carbs,
        fat: total.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const remaining = nutritionGoals.reduce((remaining, goal) => {
      const nutrient = goal.nutrient;
      remaining[nutrient] = Math.max(
        goal.goal - totalNutritionFromFood[nutrient],
        0
      );
      return remaining;
    }, {});

    setRemainingNutrition(remaining);
  }, [foodLog, nutritionGoals]);

  const handleAddFoodEntry = () => {
    if (newFoodEntry.food.trim() !== "") {
      const id = foodLog.length + 1;
      setFoodLog((prevFoodLog) => [...prevFoodLog, { id, ...newFoodEntry }]);
      setNewFoodEntry({
        food: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
    }
  };

  const handleRemoveFoodEntry = (id) => {
    setFoodLog((prevFoodLog) => prevFoodLog.filter((entry) => entry.id !== id));
  };

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setEditedGoal(goal.goal.toString());
    onOpen();
  };

  const handleEditGoalSave = () => {
    setNutritionGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.nutrient === selectedGoal.nutrient
          ? { ...goal, goal: parseFloat(editedGoal) }
          : goal
      )
    );
    onClose();
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="lg" textAlign="center">
      <Heading mb={4} fontSize="3xl" color="teal.500">
        Nutrition Tracker
      </Heading>

      {/* Nutrition Goals */}
      <VStack align="center" spacing={4} mb={8}>
        <Text fontWeight="bold" fontSize="lg">
          Nutrition Goals
        </Text>
        <HStack spacing={4}>
          {nutritionGoals.map((goal, index) => (
            <Box
              key={index}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              textAlign="center"
            >
              <Text>
                {goal.nutrient}: {goal.goal}
              </Text>
              <Tooltip label="Edit Goal" hasArrow placement="top">
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleEditGoal(goal)}
                />
              </Tooltip>
            </Box>
          ))}
        </HStack>
      </VStack>

      {/* Food Log */}
      <VStack align="center" mb={8}>
        <Text fontWeight="bold" fontSize="lg">
          Food Log
        </Text>
        <SimpleGrid columns={7} spacing={4} fontWeight="bold" width="100%">
          <Text>Food</Text>
          <Text>Calories</Text>
          <Text>Protein</Text>
          <Text>Carbs</Text>
          <Text>Fat</Text>
          <Text>Action</Text>
          <Text></Text>
          {foodLog.map((entry) => (
            <React.Fragment key={entry.id}>
              <Text>{entry.food}</Text>
              <Text>{entry.calories}</Text>
              <Text>{entry.protein}</Text>
              <Text>{entry.carbs}</Text>
              <Text>{entry.fat}</Text>
              <Tooltip label="Remove Food Entry" hasArrow placement="top">
                <IconButton
                  icon={<CloseIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveFoodEntry(entry.id)}
                />
              </Tooltip>
            </React.Fragment>
          ))}
        </SimpleGrid>
        <FormControl>
          <SimpleGrid columns={5} spacing={2} width="100%">
            <Input
              type="text"
              placeholder="Food Name"
              value={newFoodEntry.food}
              onChange={(e) =>
                setNewFoodEntry((prev) => ({ ...prev, food: e.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Calories"
              value={newFoodEntry.calories}
              onChange={(e) =>
                setNewFoodEntry((prev) => ({
                  ...prev,
                  calories: e.target.value,
                }))
              }
            />
            <Input
              type="number"
              placeholder="Protein"
              value={newFoodEntry.protein}
              onChange={(e) =>
                setNewFoodEntry((prev) => ({
                  ...prev,
                  protein: e.target.value,
                }))
              }
            />
            <Input
              type="number"
              placeholder="Carbs"
              value={newFoodEntry.carbs}
              onChange={(e) =>
                setNewFoodEntry((prev) => ({ ...prev, carbs: e.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Fat"
              value={newFoodEntry.fat}
              onChange={(e) =>
                setNewFoodEntry((prev) => ({ ...prev, fat: e.target.value }))
              }
            />
          </SimpleGrid>
          <Button
            colorScheme="teal"
            size="sm"
            mt={2}
            onClick={handleAddFoodEntry}
          >
            Add Food Entry
          </Button>
        </FormControl>
      </VStack>

      {/* Remaining Nutrition */}
      <VStack align="center" mb={8}>
        <Text fontWeight="bold" fontSize="lg">
          Remaining Nutrition
        </Text>
        <HStack spacing={4}>
          <Text>Calories: {remainingNutrition.calories}</Text>
          <Text>Protein: {remainingNutrition.protein}g</Text>
          <Text>Carbs: {remainingNutrition.carbs}g</Text>
          <Text>Fat: {remainingNutrition.fat}g</Text>
        </HStack>
      </VStack>

      {/* Edit Goal Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Enter new goal"
                  value={editedGoal}
                  onChange={(e) => setEditedGoal(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleEditGoalSave}
                    colorScheme="teal"
                  >
                    Save
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Nutrition;
