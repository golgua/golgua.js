<div align="center">
<img src="https://user-images.githubusercontent.com/46495635/52523676-3d53be80-2cd7-11e9-8b55-b24f320a74f3.png" alt="golgua-icon" width="250">
</div>

# Golgua.js ( version β )

[![Build Status](https://travis-ci.org/golgua/golgua.js.svg?branch=master)](https://travis-ci.org/golgua/golgua.js)
[![npm version](https://badge.fury.io/js/golgua.svg)](https://badge.fury.io/js/golgua)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# Overview

Golgua is a store management framework for JavaScript.<br />
Distributing and managing data and processing by type.

# install

```
npm install golgua@beta
```

or

```
yarn add golgua@beta
```

# Usage

```javascript
import { update, Types, getStoreValue, subscription } from "golgua";

const UsersTypes = Types.object({
  name: "users",
  store: [],
  types:{
    name: Types.string(),
    age: Types.number(),
    male: Types.boolean(),
    tasks: Types.array({
      types: Types.string()
    })
  },
  dispatch(users, user){
    console.log( users ); // store value
    console.log( user );  // value passed in update function

    return users.concat( user ); // next store value
  }
});

subscription(SampleTypes);

console.log( SampleTypes.getState() ); // []
console.log( getStoreValue() ); // { users:[] }

update({ name:"Jon", age:99, male:true, tasks:[] });

console.log( SampleTypes.getState() ); // [{ name:"Jon", age:99, male:true, tasks:[] }]
console.log( getStoreValue() ); // { users:[{ name:"Jon", age:99, male:true, tasks:[] }] }
```

# Contribution

- [Click here for details](/contribution/CONTRIBUTION_EN.md "CONTRIBUTION")

- [詳細はこちら](/contribution/CONTRIBUTION_JP.md "CONTRIBUTION")

# License

[MIT](LICENSE "LICENSE")
