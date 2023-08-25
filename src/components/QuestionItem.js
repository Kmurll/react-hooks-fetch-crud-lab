import React from "react";

function QuestionItem({ question, deleteQuestion, updateQuestionAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers && answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  

  const handleDelete = () => {
    deleteQuestion(id);
  };

  const handleAnswerChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    updateQuestionAnswer(id, newCorrectIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;