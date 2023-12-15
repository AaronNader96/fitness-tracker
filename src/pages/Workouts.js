import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  VStack,
  Input,
  Select,
  Button,
  List,
  ListItem,
  HStack,
  IconButton,
  Box,
  Text,
  Spacer,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
} from "@chakra-ui/react";
import {
  MdPlayArrow,
  MdStop,
  MdReplay,
  MdPause,
  MdPlayArrow as MdResume,
  MdDelete,
} from "react-icons/md";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("strength");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [fatLossGoal, setFatLossGoal] = useState(1); // Example: 1 lb per week
  const [proteinGoalPercentage, setProteinGoalPercentage] = useState(0.15);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [createdBy, setCreatedBy] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerPauseTime, setTimerPauseTime] = useState(0);

  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(storedWorkouts);
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
    updateMacros();
  }, [workouts, proteinGoalPercentage, calorieGoal, fatLossGoal]);

  useEffect(() => {
    let timerInterval;

    if (timerRunning && !timerPaused) {
      timerInterval = setInterval(() => {
        setElapsedTime((Date.now() - timerStartTime + timerPauseTime) / 1000);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerRunning, timerStartTime, timerPaused, timerPauseTime]);

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const updateMacros = () => {
    const totalMacros = workouts.reduce(
      (acc, workout) => {
        const caloriesBurned = calculateCaloriesBurned(workout.duration);
        acc.protein += caloriesBurned * proteinGoalPercentage;
        acc.carbs += caloriesBurned * 0.5; // Example: 50% of calories from carbs
        acc.fats += caloriesBurned * 0.35; // Example: 35% of calories from fats
        return acc;
      },
      { protein: 0, carbs: 0, fats: 0 }
    );

    setMacros(totalMacros);
  };

  const calculateCaloriesBurned = (duration) => {
    // Example: Assume 5 calories burned per minute of exercise
    const caloriesPerMinute = 5;
    return duration * caloriesPerMinute;
  };

  const handleAddWorkout = () => {
    if (
      workoutName.trim() !== "" &&
      workoutDuration.trim() !== "" &&
      createdBy.trim() !== ""
    ) {
      const newWorkout = {
        name: workoutName,
        type: workoutType,
        duration: parseFloat(workoutDuration),
        timestamp: getCurrentTimestamp(),
        createdBy: createdBy,
        elapsedTime: formatTime(elapsedTime),
      };
      setWorkouts([...workouts, newWorkout]);
      setWorkoutName("");
      setWorkoutType("strength");
      setWorkoutDuration("");
      setElapsedTime(0);
      setTimerPaused(false);
    }
  };

  const deleteWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  const handleStartTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      setTimerPaused(false);
      setTimerStartTime(Date.now());
      setTimerPauseTime(0);
    }
  };

  const handleStopTimer = () => {
    if (timerRunning) {
      const elapsedTime = (Date.now() - timerStartTime + timerPauseTime) / 1000; // Convert to seconds
      setWorkoutDuration(formatTime(elapsedTime));
      setTimerRunning(false);
      setTimerPaused(false);
    }
  };

  const handlePauseTimer = () => {
    if (timerRunning && !timerPaused) {
      setTimerPaused(true);
      setTimerPauseTime(timerPauseTime + Date.now() - timerStartTime);
    }
  };

  const handleResumeTimer = () => {
    if (timerRunning && timerPaused) {
      setTimerPaused(false);
      setTimerStartTime(Date.now());
    }
  };

  const handleResetTimer = () => {
    setElapsedTime(0);
    setTimerRunning(false);
    setTimerPaused(false);
    setTimerStartTime(null);
    setTimerPauseTime(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={4}
      p={4}
      maxW="1200px"
      m="auto"
      bg="gray.200"
      borderRadius="lg"
    >
      <GridItem colSpan={1}>
        <VStack
          align="start"
          spacing={4}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Box width="100%">
            <Text fontSize="xl" fontWeight="bold" mb={2} color="teal.500">
              Created by:
            </Text>
            <Input
              placeholder="Your Name"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              mb={4}
            />
          </Box>
          <Box width="100%">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
              Add a new workout
            </Text>
            <Input
              placeholder="Workout name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              mb={2}
            />
            <Select
              placeholder="Select workout type"
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              mb={2}
            >
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibility</option>
            </Select>
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={workoutDuration}
              onChange={(e) => setWorkoutDuration(e.target.value)}
              mb={4}
            />
            <Button
              colorScheme="teal"
              leftIcon={<MdPlayArrow />}
              onClick={handleStartTimer}
              mb={4}
              isDisabled={timerRunning}
            >
              Start Timer
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleAddWorkout}
              mb={4}
              isDisabled={timerRunning}
            >
              Add Workout
            </Button>
          </Box>
        </VStack>
      </GridItem>
      <GridItem colSpan={1}>
        <VStack
          align="start"
          spacing={4}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Box width="100%">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
              Goals and Nutrition
            </Text>
            <Text fontSize="md" mb={2}>
              Daily Calorie Goal:
            </Text>
            <Input
              type="number"
              placeholder="Enter your daily calorie goal"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              mb={4}
            />
            <Text fontSize="md" mb={2}>
              Fat Loss Goal (lbs per week):
            </Text>
            <Input
              type="number"
              placeholder="Enter your fat loss goal"
              value={fatLossGoal}
              onChange={(e) => setFatLossGoal(e.target.value)}
              mb={4}
            />
            <Stat mb={4}>
              <StatLabel>Protein Goal</StatLabel>
              <StatNumber>
                {(proteinGoalPercentage * 100).toFixed(0)}%
              </StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel>Protein</StatLabel>
              <StatNumber>{macros.protein.toFixed(2)} g</StatNumber>
              <Text fontSize="sm" color="gray.500">
                Protein is essential for muscle repair and growth. Aim for a
                daily intake based on your activity level and fitness goals.
              </Text>
            </Stat>
            <Stat mb={4}>
              <StatLabel>Carbs</StatLabel>
              <StatNumber>{macros.carbs.toFixed(2)} g</StatNumber>
              <Text fontSize="sm" color="gray.500">
                Carbohydrates provide energy for your workouts. Adjust your
                intake based on your training intensity and goals.
              </Text>
            </Stat>
            <Stat mb={4}>
              <StatLabel>Fats</StatLabel>
              <StatNumber>{macros.fats.toFixed(2)} g</StatNumber>
              <Text fontSize="sm" color="gray.500">
                Healthy fats are important for hormone production and overall
                health. Include sources like avocados, nuts, and olive oil in
                your diet.
              </Text>
            </Stat>
          </Box>
        </VStack>
      </GridItem>
      <GridItem colSpan={1}>
        <VStack
          align="start"
          spacing={4}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Box width="100%">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
              Timer
            </Text>
            <HStack mb={4}>
              <CircularProgress
                value={elapsedTime * 10} // Multiply by 10 to get a percentage value
                size="100px"
                thickness="8px"
                color="teal"
              >
                <CircularProgressLabel fontSize="xl">
                  {formatTime(elapsedTime)}
                </CircularProgressLabel>
              </CircularProgress>
            </HStack>
            <HStack mb={4}>
              <Tooltip label="Resume Timer" hasArrow placement="top">
                <Button
                  colorScheme="teal"
                  leftIcon={timerPaused ? <MdResume /> : <MdPlayArrow />}
                  onClick={timerPaused ? handleResumeTimer : handleStartTimer}
                  disabled={timerRunning}
                >
                  {timerPaused ? "Resume" : "Start"}
                </Button>
              </Tooltip>
              <Tooltip label="Stop Timer" hasArrow placement="top">
                <Button
                  colorScheme="red"
                  leftIcon={<MdStop />}
                  onClick={handleStopTimer}
                  disabled={!timerRunning}
                >
                  Stop
                </Button>
              </Tooltip>
              <Tooltip label="Pause Timer" hasArrow placement="top">
                <Button
                  colorScheme="teal"
                  leftIcon={<MdPause />}
                  onClick={handlePauseTimer}
                  disabled={!timerRunning || timerPaused}
                >
                  Pause
                </Button>
              </Tooltip>
              <Tooltip label="Reset Timer" hasArrow placement="top">
                <Button
                  colorScheme="teal"
                  leftIcon={<MdReplay />}
                  onClick={handleResetTimer}
                  disabled={timerRunning}
                >
                  Reset
                </Button>
              </Tooltip>
            </HStack>
          </Box>
          <Box width="100%">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
              Workout List
            </Text>
            <List width="100%">
              {workouts.map((workout, index) => (
                <ListItem key={index} borderBottom="1px solid" width="100%">
                  <HStack justify="space-between" align="center" width="100%">
                    <Box>
                      <Text>{workout.name}</Text>
                      <Text color="gray.500" fontSize="sm">
                        Type: {workout.type} | Duration: {workout.duration}{" "}
                        minutes | Created: {workout.timestamp} | Created by:{" "}
                        {workout.createdBy} | Elapsed Time:{" "}
                        {workout.elapsedTime}
                      </Text>
                    </Box>
                    <Spacer />
                    <Badge colorScheme="teal">{workout.type}</Badge>
                    <IconButton
                      aria-label="Delete workout"
                      icon={<MdDelete />}
                      onClick={() => deleteWorkout(index)}
                    />
                  </HStack>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default Workouts;
