<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="HBM" src="./src/images/hbmlogo--green.svg" width="300" />
  </a>
</p>
<h1 align="center">
  Context and Hooks Talk for HBM
</h1>

## 🚗 Test Drive

`npm i -g gatsby-cli`
`git clone git@github.cerner.com:js063531/context-talk.git`
`cd context-talk`
`npm i`
`npm run develop`

Open your browser of choice to `localhost:8000`

or if you don't want/have gatsby-cli installed go here:

https://gracious-shannon-5c32da.netlify.com/

Check it out!

### 📜 Things To Do

Both A and B contexts should have automagically fetched a Dad Joke. You should have an ID, a Status of 200 and a Joke with four buttons below each side. Also an ominous section hanging out above them. We'll get to that later.

The buttons below the text are dispatchable actions you can use to manipulate the data.

#### ✋ Get Data

Well, it gets the data. It will first look in localStorage to see if there is a key with `aResponse` or `bResponse` depending on which side you are on. These two contexts are separate and do not know about each other. You can't even dispatch B Context from A and vice-versa.

If there is no corresponding key in the localStorage it will reach for fetch and hit the `icanhazdadjoke` api endpoint to get a random Dad Joke. If you don't blink you can see the loading message.

#### 🏬 Store Data

This stores the data currently held in [A|B]State in localStorage. After you store the data you can leave the page, refresh the page, close the browser and every time you come back it'll look for data in localStorage and since it will be there after you store it that's what will show up. No API call needed.

#### 💧 Drop Data

This dumps the localStorage and the local state. You'll get an error if you try to store this. Don't do it.

#### 🆎 Copy [B|A] Context to [A|B] Context

This one is fun. It will copy the corresponding context to the current context. Just read the button. It will only work if there is a response for that context in storage. A way to communicate through localStorage.

### 🕴 Omnious Context Hanging Out Up Top

This is The Context. Literally. It is called The Context. Even in the code. This is just an example of a application suite wide context. It wraps the entire application. Using this we can easily swap the data. That's all it does. It is boring. But omnious.

## The Context Folder...Not THE The Context Folder...Just The Context Folder...The One That Has All the Contexts...Called Context.

The...This folder contains all three context folders. AContext, BContext, and TheContext. They each have three files: index.jsx, reducers.js, and types.js. We could have actions here too but we don't. So live with it. Actually...lets put a 📌 in that...I think I might add an actions context...I'll think about it.

Let's take a look at AContext and its files. BContext is basically identical. We'll look at The-Folder-Who-Must-Not-Be-Named later.

### AContext Folder

Here's where the party happens.

#### `index.jsx`

First we start off with our imports as usesh. We get some hooks too. `useReducer, useContext` and the not hook `createContext`. Why? Because I don't like to type `React.useReducer` etc. Lazy. Whatevas. Now we make our contexts.

```js
const AStateContext = createContext();
const ADispatchContext = createContext();
```

Why do we split them? Because.

Now we are going to save ourselves some nasty looking code later by putting it here. The `AProvider` will be a wrapper component for wherever we want to use AContext.

```js
export function AProvider({ children }) {
  const [state, dispatch] = useReducer(aReducer, {
    message: `A Message`,
    loading: false,
    response: null,
    errorMessage: null,
  });
  return (
    <AStateContext.Provider value={state}>
      <ADispatchContext.Provider value={dispatch}>
        {children}
      </ADispatchContext.Provider>
    </AStateContext.Provider>
  )
}
```

So, cool. Can you image doing that for every component you wanted to use AContext for? No me either, that's why I put it here. A lot of other articles/tutorials have it the other way and whoa is it messy. Gross.

PropTypes. We know what they are.

CUSTOM HOOKS!!!!! HECK YES! Let's see what they do!

```js
export function useAState() {
  const context = useContext(AStateContext);
  if (context === undefined ) {
    throw new Error(`useAState must be used within a AProvider`)
  } return context;
}

export function useADispatch() {
  const context = useContext(ADispatchContext);
  if (context === undefined) {
    throw new Error(`useADispatch must be used with a AProvider`)
  } return context;
}
```

So pretty. Let's just take a minute to appreciate their beauty.

Okay, so these things let you use their corresponding (using that word a lot) context. If you need state, use useAState, if you need dispatch use useADispatch. How? I'll show you! Hold on!

#### `reducers.js`

Ooookay. Reducers...oh...you want to know how to use the custom hooks still? Can you wait? No? Fine. We'll come back to reducers. __mumbles__

#### Custom Hooks Usage

Let's do this now. Out of order...

Moving OUT OF THE ACONTEXT FOLDER. And over to the components. We're going to go find a js file. No, literally. `A.js` file. Found it? Okay, doesn't matter I'm going to paste most of it here.

First, import the hooks! As you know how to do already. Skipping.

Now. Hooks have to be in custom hooks or in functional components. So lets use them in our functional component.

```js
export default function A() {

}
```

Here they come...

Ready??

Okay...without further ado.

```js
export default function A() {
  const { response, loading } = useAState();
  const dispatch = useADispatch();
}
```

*Thunderous applause*

Thank you, thank you. You're too kind.

Oh, you want to see the rest? Fine.

```js
export default function A() {
  const { response, laoding } = useAState();
  const dispatch = useADispatch();

  async function handleGetData() {
    dispatch({ type: type.GET })
    if (!localStorage.getItem(`aResponse`)) {
      try {
        const responseJson = await fetch(`https:icanhazddajoke.com/`, {
          method: `GET`,
          headers {
            Accept: `application/json`,
          },
        }).then(r => r.json())
        dispatch({ type: types.GOT, response: responseJson })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Something went wrong. It is probably your fault.`,
        });
      }
    } else {
      try {
        dispatch({
          type: types.FETCH_STORE,
          response: JSON.parse(localStorage.getItem(`aResponse`)),
        })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Error Message: ${err}`,
        })
      }
    }
  }
  ...

  return (
    <>
      <button disabled={!!loading} type="button" onClick={handleGetData}>
        Get Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleStoreData}>
        Store Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleDropData}>
        Drop Data
      </button>
      <button disabled={!!loading} type="button" onClick={handleCopyBContext}>
        Copy B Context to A Context
      </button>
    </>
  )
}
```

So I'm only going to have one function in here. You can go look at the other functions later. Let us break it down though. There's a lot to consume here.

```js
dispatch({ type: type.GET })
```

Just like Redux we dispatch like so.

```js
    if (!localStorage.getItem(`aResponse`)) {
      try {
        const responseJson = await fetch(`https:icanhazddajoke.com/`, {
          method: `GET`,
          headers {
            Accept: `application/json`,
          },
        }).then(r => r.json())
        dispatch({ type: types.GOT, response: responseJson })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Something went wrong. It is probably your fault.`,
        });
      }
    }
```

Here we look to see if there is a localStorage key `aResponse`. If there isn't it it will send the API call and then dispatch GOT sending the response to the context. If it errors we handle that.

```js
    else {
      try {
        dispatch({
          type: types.FETCH_STORE,
          response: JSON.parse(localStorage.getItem(`aResponse`)),
        })
      } catch (err) {
        dispatch({
          type: types.FETCH_ERROR,
          errorMessage: `Error Message: ${err}`,
        })
      }
    }
```

If there is a localStorage `aResponse` it will get it and store it in context.

Pretty neat right? Cool. Back to our regularly scheduled directory traversal.

#### `reducers.js` Again

Reducers in Context look strangely like Redux reducers. I had these in all in one big reducer, but hey could be split up and we could even use Redux's `combineReducers` to export them as one. Or we could have different Reducers for different areas of the application. For example: HBM could have `healthPlansReducer, periodsReducer, sectionsReducers` all in one reducers file and we would then export them individually and have different providers for them in the `index.jsx`. `HealthPlansProvider`, `PeriodsProvider`, `SectionsProvider`. If we needed multiple providers we just stack them.

```js
<HealthPlansProvider>
  <PeriodsProvider>
    {children}
  </PeriodsProvider>
</HealthPlansProvider>
```

Like the above examples shows we could even combine them into one Provider and export that from `index.jsx` or if we had common combinations we could export them together. Something to talk about before we start implementing this.

Anyway. Tangent aside. Reducers.

switch. Type. State. Anything you send in a dispatch goes in the props. Destructure the action prop. default case should always be:

```js
default: {
  throw new Error(`Unhandled action type: ${type}`)
}
```

No reason to return information when we don't want to.

#### `types.js`

Not even going into it. It is just a constants file like the one we have already.

### The-Folder-Who-Whom?-Who.-Who-Must-Not-Be-Named

This is literally the same thing. Just instead of the `GET`, `GOT`, `FETCH` etc cases we have `SWAP`, `SWAPPED`, `SWAP_ERROR`. Since that's all it does. But you could do some fancy stuff with it by including the A and/or B Providers and use it for communication...in fact. HERE'S AN EXAMPLE!


```js
import { AProvider } from '../AContext'
import { BProvider } from '../BContext'

...

export function TheABProvider({ children }) {
  const [state, dispatch] = useReducer(theReducer, {
    message: `Data Not Swapped`,
  });
  return (
    <TheStateContext.Provider value={state}>
      <TheDispatchContext.Provider value={dispatch}>
        <AProvider>
          <BProvider>
            {children}
          </BProvider>
        </AProvider>
      </TheDispatchContext.Provider>
    </TheStateContext.Provider>
  )
}
```

320th Line. For some reason I've typed all of this. I've actually not copied and pasted anything. I need an alias for that.

## Components Folder

Let's take a look at the components that matter

### `ADisplay.js`

We looked at `A.js` already so we're skipping it.

Exporting default here, brining in `useAState` and `useADispatch`. `useADispatch` is being brought in for the `useEffect`. We'll comeback to the `useEffect`

```js
export default function ADisplay() {
  const {
    message,
    loading,
    response,
    errorMessage,
  } = useAState();

  const dispatch = useADispatch();

  ... // useEffect is here. I don't want it to distract you.

  return (
    <div>
      <h2 style={{ fontFamily: 'serif' }}>A Context</h2>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {loading && <Loading />}
      <h3>{message}</h3>
      {response !== null && (
        <Response
          id={response.id}
          status={response.status}
          joke={response.joke}
        />
      )}
      <A />
    </div>
  )
}
```

So, we are destructuring `useAState()` and bringing in all the state items from the reducer. And dispatch, but we're not talking about that...yet.

The return is normal. As we're all used to.

So. Check out the hook while the DJ revolves it.

```js
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: `GET` });
      if (!localStorage.getItem(`aResponse`)) {
        try {
          const responseJson = await fetch(`https://icanhazdadjoke.com/`, {
            method: `GET`,
            headers: {
              Accept: `application/json`,
            },
          }).then(r => r.json())
          dispatch({ type: `GOT`, response: responseJson })
        } catch (err) {
          dispatch({
            type: `FETCH_ERROR`,
            errorMessage: `Something went wrong. It is probably your fault.`,
          })
        }
      } else {
        try {
          dispatch({
            type: `FETCH_STORE`,
            response: JSON.parse(localStorage.getItem(`aResponse`)),
          });
        } catch (err) {
          dispatch({ type: `FETCH_ERROR`, errorMessage: `Error Message: ${err}` })
        }
      }
    }
    fetchData();
  }, []);
```

`useEffect()` is the replacement for `componentDidMount`, `componentWillUnMount`, and `componentDidUpdate`. All in one function. Woo!!!!!! This is why you get data on load. It is the same `handleGetData` function so we'll talk about the other parts.

```js
  useEffect(() => {
    async function fetchData() {
      ...
    }
    fetchData();
  }, []);
```

`useEffect` can not be asynchronous. But a function inside that you immediately call can be. So, for the API call we make a fetchData function then call it. The funky bit at the end is important.

`}, []);`. What?! Is! THIS!? There's magic in the air. WHAT'S THIS?! There's white stuff everywhere!

Anyway. `useEffect` takes to arguments. A function and this array thing. An whatever is in the array tells the `useEffect` hook to rerun anytime that item is changed. If you only want it to run once, on mount, pass it an empty array. If you omit the array it will rerun on every rerender. That can cause a lot of problems. But could also be desired.

One thing we're missing here is a return statement for the function. You don't have to have it, but if we are subscribing to something, you should. The return statement runs on unmount and it is good to clean up after yourself. Your browser isn't your mother. So a `return sub.unsub();` is best practice. Since we aren't subscribing to `icanhazdadjoke` we don't need to unsubscribe from it.

## That's It.

Questions? Comments? Concerns? Upset I got lazy with the emojis and stopped using them? Make a PR with them added and I'll merge it.