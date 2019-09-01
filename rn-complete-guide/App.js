import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

import ListItem from "./components/ListItem";
import ListInput from "./components/ListInput";

export default function App() {
  const [listGoals, setListGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setListGoals(currentList => [
      ...currentList,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeListHandler = listId => {
    setListGoals(currentGoals => {
      return currentGoals.filter(list => list.id !== listId);
    });
  };

  const cancelListAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add ToDo List" onPress={() => setIsAddMode(true)} />
      <ListInput
        visible={isAddMode}
        onAddList={addGoalHandler}
        onCancel={cancelListAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={listGoals}
        renderItem={itemData => (
          <ListItem
            id={itemData.item.id}
            onDelete={removeListHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
