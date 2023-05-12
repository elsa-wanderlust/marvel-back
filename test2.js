const handleNumberOfPages = (counts, limit) => {
  const numberOfPagesTotal = Math.ceil(counts / limit);
  console.log(numberOfPagesTotal);
  //   let group10 = Math.ceil(numberOfPagesTotal / 10);
  let numberOfPages = [];
  let group10Tab = [];
  for (let i = 1; i <= numberOfPagesTotal; i++) {
    if (group10Tab.length === 0) {
      group10Tab.push(i);
    } else if (i === numberOfPagesTotal) {
      group10Tab.push(i);
      numberOfPages.push(group10Tab);
    } else if (group10Tab.length % 10 !== 0) {
      group10Tab.push(i);
    } else {
      numberOfPages.push(group10Tab);
      group10Tab = [];
      group10Tab.push(i);
    }
  }
  return numberOfPages;
};

console.log(handleNumberOfPages(4320, 100));
