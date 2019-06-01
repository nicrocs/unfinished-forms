<Input
                        type="text"
                        label="question"
                        required
                        value={question.question}
                        onChange={e => updateQuestionField(e, index)}
                      />
                      <div>
                        <label htmlFor="questionDescription">Description</label>
                        <textarea
                          id="questionDescription"
                          name="description"
                          placeholder="Enter A Description"
                          value={question.description}
                          onChange={e => updateQuestionField(e, index)}
                        />
                      </div>
                      <label htmlFor="questionType">
                        Type
                        <select
                          id="questionType"
                          name="type"
                          required
                          value={question.type}
                          onChange={e => updateQuestionField(e, index)}
                        >
                          {possibleTypes.map(type => {
                            return (
                              <option value={type.type} key={type.type}>
                                {type.display}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                      {/* if short answer or paragraph show input type */}
                      {/* if multiple choice or checkboxes show choices */}
                      <h4>Choices</h4>