<div align="center">
<img src="https://user-images.githubusercontent.com/46495635/52523676-3d53be80-2cd7-11e9-8b55-b24f320a74f3.png" alt="golgua-icon" width="250">
</div>

# Golgua.js ( version β )

[![Build Status](https://travis-ci.org/golgua/golgua.js.svg?branch=master)](https://travis-ci.org/golgua/golgua.js)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# Overview

Golgua is a store management framework for JavaScript.<br />
Distributing and managing data and processing by type.

# install

```
npm install golgua
```

or

```
yarn add golgua
```

# Usage

```javascript
import Golgua from "golgua";


class SampleState extends Golgua.State {
  constructor(){
    super();

    this.types = {
      message : Golgua.Types.string()
    }
  }

  willUpdate( props ){
    return {
      message : props.message + "!!";
    }
  }

}

const maker = createMaker( SampleState );

maker.listen( updated_data => {
  alert( update_data.message ); // Hello World!!
});

maker.update({ message : "Hello World" });

```

# Contribution

- [Click here for details](/contribution/CONTRIBUTION_EN.md "CONTRIBUTION")

- [詳細はこちら](/contribution/CONTRIBUTION_JP.md "CONTRIBUTION")

# License

[MIT](LICENSE "LICENSE")
