# React Native (RN)
Framework for building native apps using React  

<https://github.com/iamshaunjp/react-native-tutorial>

need expo-cli to get started with RN

```npm
npm i expo-cli --global

expo init my-project 
// this might fail with error  -
// running scripts disabled on this machine
// solution - open powershell in admin mode and enter - Set-ExecutionPolicy RemoteSigned

cd my-project, npm i, npm run start

// before npm start, ensure the andriod virtual device is up and running
```

ecpo-cli provides various ways to view app  
1. in android studio virtual device 
2. in our own mobile app (by downloading expo client and scanning the QR code shown when npm run start cmd is run)

```javascript
import React, {useState} from 'react';
// see below line - these are default comps provided in RN
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

// veiw = div in html and Text = p, TextInput = <input> in html
// since this is for mobile apps, we cannot render html/css below
// hooks are same as react hooks

export default function App() {
    const [name, setName] = useState('Ashish');
    const updateName = () => {
      setName('Sharma');
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>Hello, World!</Text>
      </View>
      <View style={styles.body}>
       <Text > Enter Name </Text>
       <TextInput 
          style={styles.input}
          placeholder='name'
          keyboardType='numeric' // default is aplhabhetic
          onChangeText={(val) => setName(val)}/>
       <Button title="update name" onPress={updateName}
       // note - we can't add style attribute to button comp
       // workaround - create our own button func in RN
       // although button can accept few props like - color, which should be enough
       /> 
       
       <Text>Updated name is {name}</Text>
      </View>    
      
    </View>
    // we can render lists same way as that in react
    // students.map((item) => {return <View><Text>{item.name}</Text></View>})
    // by default in RN, we cannot scroll, to do that we need to use <ScrollView> comp provided by RN
    // <ScrollView> {render-the-list} </ScrollView>

    // instead of rendering list by above method we can use inbuild comp of RN - FlatList
    <FlatList 
        numColumns={2} // 2 list items renderd in 1 row
        keyExtractor={(item) => item.id} // react requires key prop for each item, if our array has id instead of key then
        data={people} // actual array list that needs to be renderd
        renderItem={({ item }) => ( // JSX - to let FlatList know what to render
          // TouchableOpacity - makes anything touchable on the app, and changes it's opacity
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
  );
}

// stylesheet component similar to css stylesheet
// each property below (container, header) is like a class but
// imp diff - in css styles are inherited, but in RN each child elem need to have the
// classes assigned, not inherited by default
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  },
  body: {
    backgroundColor: 'yellow',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1
  }
});
```

Use this link to add any icons in RN -  <https://icons.expo.fyi/>   
