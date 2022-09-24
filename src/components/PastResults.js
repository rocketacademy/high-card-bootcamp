

export function PastResults({ value }){
  return(
    <div>
      <h3>Past Results</h3>
      <ol>
        {value.map((array, index) => (
          <li key={index}>Player 1 ({array[0]}), Player 2 ({array[1]})</li>
        ))}
      </ol>
    </div>
  );
}