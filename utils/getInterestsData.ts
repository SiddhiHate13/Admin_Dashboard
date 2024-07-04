// utils/getInterestsData.ts

export const getInterestsData = async (): Promise<Record<string, number>> => {
    const response = await fetch('/userprofile.json');
    const data = await response.json();
  
    const interestCounts: Record<string, number> = {};
  
    data.users.forEach((user: any) => {
      user.interested.forEach((interestObj: any) => {
        const interest = interestObj.interest;
        if (interestCounts[interest]) {
          interestCounts[interest]++;
        } else {
          interestCounts[interest] = 1;
        }
      });
    });
  
    const totalUsers = data.users.length;
  
    // Calculate percentage
    for (const interest in interestCounts) {
      interestCounts[interest] = (interestCounts[interest] / totalUsers) * 100;
    }
  
    return interestCounts;
  };
  