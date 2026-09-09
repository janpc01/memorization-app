# Memorization App

A small Next.js app for memorizing text one line at a time. Paste in a passage,
then retype it line by line against a running timer.

## How it works

1. Paste or type the text you want to memorize, then press **Start Practice**.
   The timer starts immediately. Blank lines are ignored and each line is trimmed.
2. Type each line and press Enter. A correct line is added to the list above the
   input and the next line is expected. An incorrect line does nothing.
3. Finish every line to see your total time, or press **Give Up** to reveal the
   full text.
4. **Try Again** restarts the run with the same text and a fresh timer, and
   **New Text** returns to the editor with your text still loaded.

## Try it out locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

