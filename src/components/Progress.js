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
} from "@chakra-ui/react";

function Progress() {
  const [overallStats, setOverallStats] = useState({});
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);
  const [fitnessStreak, setFitnessStreak] = useState("");
  const [motivationalQuotes, setMotivationalQuotes] = useState([]);

  const [newAchievement, setNewAchievement] = useState("");
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    setOverallStats({
      totalWorkouts: 50,
      totalHours: 25,
    });

    setRecentAchievements([
      "Completed a 5k run",
      "Reached a new weightlifting personal record",
    ]);

    setUpcomingGoals([
      { goal: "Run 10 miles", status: "Not Started" },
      { goal: "Lift 200 lbs", status: "Not Started" },
    ]);

    setFitnessStreak("15 days");

    setMotivationalQuotes([
      "Believe in yourself. You are braver than you think.",
      "Strive for progress, not perfection.",
    ]);
  }, []);

  const handleAddAchievement = () => {
    if (newAchievement.trim() !== "") {
      setRecentAchievements((prevAchievements) => [
        ...prevAchievements,
        newAchievement,
      ]);
      setNewAchievement("");
    }
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      setUpcomingGoals((prevGoals) => [
        ...prevGoals,
        { goal: newGoal, status: "Not Started" },
      ]);
      setNewGoal("");
    }
  };

  const handleGoalStatusChange = (index) => {
    const updatedGoals = [...upcomingGoals];
    updatedGoals[index].status =
      updatedGoals[index].status === "Not Started"
        ? "In Progress"
        : "Not Started";
    setUpcomingGoals(updatedGoals);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="lg">
      <Heading mb={4} fontSize="3xl" color="teal.500">
        Your Fitness Progress
      </Heading>

      <SimpleGrid columns={3} spacing={6} mb={8}>
        {/* Overall Stats */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            Overall Stats
          </Text>
          <Text>Total Workouts: {overallStats.totalWorkouts}</Text>
          <Text>Total Hours: {overallStats.totalHours}</Text>
        </VStack>

        {/* Recent Achievements */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            Recent Achievements
          </Text>
          {recentAchievements.map((achievement, index) => (
            <Text key={index} fontSize="sm">
              {achievement}
            </Text>
          ))}
          <FormControl>
            <Input
              type="text"
              placeholder="Add new achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
            />
            <Button
              colorScheme="teal"
              size="sm"
              mt={2}
              onClick={handleAddAchievement}
            >
              Add Achievement
            </Button>
          </FormControl>
        </VStack>

        {/* Upcoming Goals */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            Upcoming Goals
          </Text>
          {upcomingGoals.map((goal, index) => (
            <HStack key={index} spacing={2}>
              <Text fontSize="sm">{goal.goal}</Text>
              <Spacer />
              <Button
                colorScheme="teal"
                variant={goal.status === "Not Started" ? "outline" : "solid"}
                size="sm"
                onClick={() => handleGoalStatusChange(index)}
              >
                {goal.status}
              </Button>
            </HStack>
          ))}
          <FormControl>
            <Input
              type="text"
              placeholder="Add new goal"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <Button colorScheme="teal" size="sm" mt={2} onClick={handleAddGoal}>
              Add Goal
            </Button>
          </FormControl>
        </VStack>
      </SimpleGrid>

      {/* Fitness Streak */}
      <VStack align="start" mb={8}>
        <Text fontWeight="bold" fontSize="lg">
          Fitness Streak
        </Text>
        <Text fontSize="md">Current Streak: {fitnessStreak}</Text>
      </VStack>

      {/* Motivational Quotes */}
      <VStack align="start">
        <Text fontWeight="bold" fontSize="lg">
          Motivational Quotes
        </Text>
        {motivationalQuotes.map((quote, index) => (
          <Text key={index} fontSize="md">
            "{quote}"
          </Text>
        ))}
      </VStack>
    </Box>
  );
}

export default Progress;
