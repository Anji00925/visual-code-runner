# Cybosocks Block Coder

A small block-based coding editor for children built with **React** and **Blockly**.

Users can create programs by connecting visual blocks such as `move`, `turn`, `say`, and `repeat`. The editor converts the visual program into a structured JSON format, which can then be executed using the Java console runner.

---

## Features

- 🧩 Visual block-based programming using Blockly
- ➡️ Custom `move` block
- 🔄 Custom `turn` block
- 💬 Custom `say` block
- 🔁 Custom `repeat` container block
- ♾️ Nested `repeat` blocks to any depth
- 📄 Live JSON generation
- 📋 Copy generated JSON to clipboard
- ⬇️ Download generated JSON as `program.json`
- 🐢 Java virtual turtle execution
- ⚠️ Clean validation errors without Java stack traces
- 📊 Live block and top-level stack statistics
- 📱 Responsive web interface

---

## Tech Stack

### Frontend

- React
- JavaScript
- Blockly
- Vite
- CSS

### Runner

- Java 17+
- Maven
- Gson

---

## Project Structure

```text
visual-code-runner/
│
├── web/
│   ├── src/
│   │   ├── blocks/
│   │   │   ├── move.js
│   │   │   ├── turn.js
│   │   │   ├── say.js
│   │   │   └── repeat.js
│   │   │
│   │   ├── components/
│   │   │   ├── BlocklyEditor.jsx
│   │   │   └── JsonPreview.jsx
│   │   │
│   │   ├── generator/
│   │   │   └── programGenerator.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── package.json
│   └── ...
│
├── runner/
│   ├── pom.xml
│   ├── program.json
│   │
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── cybosocks/
│                       ├── Main.java
│                       ├── ProgramRunner.java
│                       └── Turtle.java
│
└── README.md




Web Application
Requirements
Node.js
npm
Setup

Clone the repository and enter the web application directory:

cd web

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL displayed by Vite.

Block Editor

The editor uses Blockly rather than a custom drag-and-drop implementation.

The custom blocks are:

Move

Moves the turtle forward by a specified number of steps.

Example:

move 5 steps

Generated JSON:

{
  "type": "move",
  "steps": 5
}
Turn

Turns the turtle 90 degrees left or right.

Example:

turn right

Generated JSON:

{
  "type": "turn",
  "direction": "right"
}
Say

Prints a message during program execution.

Example:

say Hello!

Generated JSON:

{
  "type": "say",
  "text": "Hello!"
}
Repeat

Repeats the blocks inside its body a specified number of times.

Example:

repeat 3 times
    move 2 steps
    turn right

Generated JSON:

{
  "type": "repeat",
  "times": 3,
  "body": [
    {
      "type": "move",
      "steps": 2
    },
    {
      "type": "turn",
      "direction": "right"
    }
  ]
}

Repeat blocks can contain other repeat blocks, allowing nested programs to any depth.

JSON Format

The complete program is represented using the following structure:

{
  "program": [
    {
      "type": "say",
      "text": "Hi!"
    },
    {
      "type": "move",
      "steps": 3
    },
    {
      "type": "repeat",
      "times": 4,
      "body": [
        {
          "type": "move",
          "steps": 2
        },
        {
          "type": "turn",
          "direction": "right"
        }
      ]
    }
  ]
}

The JSON is generated automatically whenever the Blockly workspace changes.

How the System Works
┌──────────────────────┐
│   Blockly Editor     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Custom JSON Generator│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     program.json     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Java Runner       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Virtual Turtle     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Console Output     │
└──────────────────────┘
Java Runner
Requirements
Java 17 or later
Maven
Build

Enter the runner directory:

cd runner

Build the executable JAR:

mvn clean package

The executable JAR is generated at:

runner/target/runner.jar
Run

From the directory containing runner.jar:

java -jar runner.jar program.json

For example, when testing from the project structure:

cd runner/target
java -jar runner.jar ../program.json
Virtual Turtle

The Java runner starts the turtle at:

Position: (0, 0)
Direction: NORTH

The coordinate system is:

        NORTH
          ↑
          |
WEST  ← (0,0) →  EAST
          |
          ↓
        SOUTH

Movement follows the current direction:

NORTH → +Y
EAST  → +X
SOUTH → -Y
WEST  → -X

A turn operation rotates the turtle by 90 degrees.

Example Execution

Given:

{
  "program": [
    {
      "type": "say",
      "text": "Hello!"
    },
    {
      "type": "move",
      "steps": 3
    },
    {
      "type": "turn",
      "direction": "right"
    },
    {
      "type": "move",
      "steps": 2
    }
  ]
}

The runner produces:

Hello!
Final position: (2,3) facing EAST
Nested Repeat Example

The system supports nested repeat blocks.

Example:

{
  "program": [
    {
      "type": "repeat",
      "times": 2,
      "body": [
        {
          "type": "say",
          "text": "outer"
        },
        {
          "type": "move",
          "steps": 3
        },
        {
          "type": "repeat",
          "times": 2,
          "body": [
            {
              "type": "say",
              "text": "inner"
            },
            {
              "type": "turn",
              "direction": "right"
            }
          ]
        }
      ]
    }
  ]
}

Output:

outer
inner
inner
outer
inner
inner
Final position: (0,0) facing NORTH

The nested repeat is handled recursively by the Java program runner.

Error Handling

The Java runner validates the input program and reports errors using a single clean line.

Examples:

Unknown block
ERROR: unknown block type: jump
Missing parameter
ERROR: missing move steps
Negative repeat
ERROR: repeat times cannot be negative
Malformed JSON
ERROR: malformed JSON or invalid program

The runner does not expose Java stack traces to the user for invalid input.

Testing

The following cases were tested during development:

Basic say execution
Basic movement
Left and right turns
Multiple connected top-level blocks
Repeat execution
Nested repeat execution
Repeat with zero iterations
Negative repeat validation
Unknown block validation
Missing parameter validation
Malformed JSON handling
Final turtle position and direction
AI Usage

AI tools were used as a development assistant during the project.

AI assistance was used for:

Planning the application structure
Reviewing the React and Blockly implementation
Creating and reviewing custom Blockly block definitions
Designing the JSON generator
Implementing the Java runner structure
Reviewing recursive repeat execution
Identifying edge cases
Improving the UI structure and styling
Reviewing README structure and documentation

All generated code was reviewed and tested manually before being kept in the project.

One Thing AI Got Wrong

During development, the initial JSON generator correctly handled the blocks inside a repeat body, but it did not initially walk the next connection for top-level blocks.

For example, a Blockly stack like:

say "Hello!"
    ↓
turn right
    ↓
say "Hello!"

was initially converted into JSON containing only the first say block.

This was discovered by testing a connected stack of blocks in the Blockly workspace and comparing the visual program with the generated JSON.

The generator was then fixed by explicitly walking the complete top-level block chain using Blockly's getNextBlock() connection.

After the fix, the same stack correctly generated all three instructions in the correct order.

One Uncertain Decision

One design decision was whether the web application should directly execute the Java runner through a backend.

The current implementation keeps the React editor and Java runner separate.

The React application generates program.json, while the Java application consumes that JSON as a command-line program.

This keeps the implementation simple and matches the requested Java console runner workflow.

With another five hours, I would explore adding an optional backend execution layer so that the web interface could send the generated JSON to the Java runner and display the execution output directly in the browser.

Demo Video

TODO: Add the 3-minute demo video link here.

The demo will show:

Creating a nested repeat program
Generating the JSON
Copying the JSON
Running the program through the Java runner
Showing the console output
Explaining one part of the code I am particularly happy with
Live Demo

TODO: Add the hosted web application URL here.