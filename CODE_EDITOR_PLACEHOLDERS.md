# Code Editor Dynamic Placeholders

## Overview

The Code Editor now displays technology-specific placeholder text based on the interview technology stack being used.

## Implementation

### 1. Technology Prop Flow

The technology information flows from `App.jsx` → `InterviewPage.jsx` → `localStorage/Backend` → `CodeEditor.jsx`:

```
App.jsx (selectedTechnology)
  ↓
InterviewPage.jsx (technology, technologyName)
  ↓
localStorage/Backend (questionInfo.technology)
  ↓
CodeEditor.jsx (displays appropriate placeholder)
```

### 2. Placeholder Templates

Each technology has its own placeholder template:

- **Rails (Ruby on Rails)**:
  ```ruby
  # Type your Ruby/Rails code here...

  def example
    puts 'Hello, Rails!'
  end
  ```

- **Node.js**:
  ```javascript
  // Type your Node.js code here...

  function example() {
    console.log('Hello, Node.js!');
  }
  ```

- **React**:
  ```javascript
  // Type your React code here...

  function Example() {
    return <div>Hello, React!</div>;
  }
  ```

- **Python**:
  ```python
  # Type your Python code here...

  def example():
      print('Hello, Python!')
  ```

### 3. Code Changes

#### `App.jsx`
- Pass `technology` and `technologyName` props to `InterviewPage`

#### `InterviewPage.jsx`
- Receive `technology` and `technologyName` props
- Include them in `questionInfo` when creating a code session

#### `CodeEditor.jsx`
- Added `getPlaceholderByTech()` helper function
- Use dynamic placeholder based on `questionInfo.technology`

## Benefits

1. **Better UX**: Candidates see relevant syntax examples for the technology they're being interviewed on
2. **Context-Aware**: The placeholder matches the interview context
3. **Guidance**: Provides a starting point with correct syntax for each language

## Fallback

If no technology is specified or it's not recognized, a generic placeholder is shown:
```
// Type your code here...
```

## Testing

To test the dynamic placeholders:

1. Start an interview for different technologies (Rails, Node.js, React, Python)
2. Create a code editor session
3. Open the shared link
4. Verify the placeholder matches the selected technology

## Future Enhancements

- Add more technology stacks (Java, Go, etc.)
- Include technology-specific code snippets relevant to the question
- Add syntax highlighting matching the technology

