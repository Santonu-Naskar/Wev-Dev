class MyClass {

    myTest() {
      console.log('it works');
    }

    runMyTest() {
      this.myTest();
    }

}

var myClass = new MyClass();
myClass.runMyTest();