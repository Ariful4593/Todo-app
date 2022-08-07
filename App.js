import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const COLORS = { primary: '#1f145c', white: '#fff' }
export default function App() {

  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([
    { id: 1, task: 'First Todo', completed: false },
    { id: 2, task: 'Second Todo', completed: true },
  ])

  const ListItem = ({ todo }) => {
    return <View style={styles.listItem} >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.primary, textDecorationLine: todo?.completed ? "line-through" : 'none' }} >{todo?.task}</Text>
      </View>
      {
        !todo?.completed && <TouchableOpacity style={[styles.actionIcon]} onPress={() => markTodoComplete(todo.id)} >
          <Icon name='done' size={20} color={COLORS.white} />
        </TouchableOpacity>
      }

      <TouchableOpacity style={[styles.actionIcon, { backgroundColor: 'red' }]}>
        <Icon name='delete' size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  }

  const addTodo = () => {
    if (textInput) {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTextInput('')
    } else {
      Alert.alert('Error', 'Please input todo.')
    }
  }

  const markTodoComplete = (todoId) => {
    const newTodos = todos.map(item => {
      if (item.id === todoId) {
        return {
          ...item, completed: true
        }
      }
      return item;
    })

    setTodos(newTodos)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.primary }} >Todo App</Text>
        <Icon name='delete' size={25} color='red' />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Add Todo'
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo} >
          <View style={styles.iconContainer}>
            <Icon name='add' color={COLORS.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,

  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
