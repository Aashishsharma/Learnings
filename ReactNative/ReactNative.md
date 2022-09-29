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
import { StyleSheet, Text, View, Button } from 'react-native';

// veiw = div in html and Text = p in html
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
       <Text > My Name is {name}</Text>
       <Button title="update name" onPress={updateName} />
      </View>
      
    </View>
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
  }
});
```