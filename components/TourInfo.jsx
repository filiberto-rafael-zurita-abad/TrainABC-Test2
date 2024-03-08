const TourInfo = ({ tour }) => {
  const { title, description, examples, titleForExamples, 
    titleFillBlanks, fillBlanks,
    titleOneReading, oneReading, oneReadingQuestions, 
    titleTwoReading, twoReading, twoReadingQuestions,
    titleThreeReading, threeReading, threeReadingQuestions,
    titleConclusion, conclusion

    } = tour;

    

  return (
    <div className='max-w-2xl'>
      <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
      <p className='leading-loose mb-6'>{description}</p>

      <h1 className='text-4xl font-semibold mb-4'>{titleForExamples}</h1>

      <ul>
        {examples.map((example) => {
          return (
            <li key={example} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{example}</p>
            </li>
          );
        })}
      </ul>

      <h1 className='text-4xl font-semibold mb-4'>{titleFillBlanks}</h1>

      <ul>
        {fillBlanks.map((example) => {
          return (
            <li key={example} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{example}</p>
            </li>
          );
        })}
      </ul>

      <h1 className='text-4xl font-semibold mb-4'>{titleOneReading}</h1>
      <p className='leading-loose mb-6'>{oneReading}</p>

      

      <ul>
        {oneReadingQuestions.map((example) => {
          return (
            <li key={example} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{example}</p>
            </li>
          );
        })}
      </ul>

      

      <h1 className='text-4xl font-semibold mb-4'>{titleTwoReading}</h1>
      <p className='leading-loose mb-6'>{twoReading}</p>
      <ul>
        {twoReadingQuestions.map((example) => {
          return (
            <li key={example} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{example}</p>
            </li>
          );
        })}
      </ul>


      <h1 className='text-4xl font-semibold mb-4'>{titleThreeReading}</h1>
      <p className='leading-loose mb-6'>{threeReading}</p>
      <ul>
        {threeReadingQuestions.map((example) => {
          return (
            <li key={example} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{example}</p>
            </li>
          );
        })}
      </ul>

      <h1 className='text-4xl font-semibold mb-4'>{titleConclusion}</h1>
      <p className='leading-loose mb-6'>{conclusion}</p>





    </div>
  );
};
export default TourInfo;
