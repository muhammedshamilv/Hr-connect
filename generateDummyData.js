const { PrismaClient } = require('@prisma/client');
const currentDate = new Date();
const prisma = new PrismaClient();

async function main() {
  // Create Designations
  const designations = await prisma.designation.createMany({
    data: [
      { title: 'Designation 1', description: 'Description for Designation 1' },
      { title: 'Designation 2', description: 'Description for Designation 2' }
      // Add more designations here
    ]
  });
  // Create Users with TaskLogs, Grievances, and other related data
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'User1',
        email: 'user1@example.com',
        code: 12345,
        dateOfBirth: new Date('1990-01-01'),
        address: '123 Main St, City, Country',
        bloodGroup: 'A+',
        resume: 'https://example.com/user1_resume.pdf',
        password: 'user1password',
        role: 'employee',
        designation: 1, // Use a valid designation ID
        currentDesignation: 1, // Use a valid designation ID
        dateOfJoining: new Date('2010-05-15')
      },
      {
        name: 'User2',
        email: 'user2@example.com',
        code: 54321,
        dateOfBirth: new Date('1985-03-10'),
        address: '456 Elm St, City, Country',
        bloodGroup: 'B-',
        resume: 'https://example.com/user2_resume.pdf',
        password: 'user2password',
        role: 'manager',
        designation: 2, // Use a valid designation ID
        currentDesignation: 2, // Use a valid designation ID
        dateOfJoining: new Date('2008-08-20')
      }
      // Add more users here
    ]
  });

  // Create TaskLogs for Users
  await prisma.taskLog.createMany({
    data: [
      {
        userId: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        currentDate: currentDate,
        updatedDate: currentDate
      },
      {
        userId: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        currentDate: currentDate,
        updatedDate: currentDate
      },
      {
        userId: 1,
        title: 'Task 3',
        description: 'Description for Task 3',
        currentDate: currentDate,
        updatedDate: currentDate
      }
      // Add more task logs here
    ]
  });

  // Create Grievances for Users
  await prisma.grievance.createMany({
    data: [
      {
        userId: 1,
        title: 'Grievance 1',
        description: 'Description for Grievance 1',
        isRequirement: false
      },
      {
        userId: 2,
        title: 'Grievance 2',
        description: 'Description for Grievance 2',
        isRequirement: true
      }
      // Add more grievances here
    ]
  });

  // Create ServiceRecords for Users
  await prisma.serviceRecord.createMany({
    data: [
      {
        userId: 1,
        companyName: 'Company A',
        from: new Date('2022-01-01'),
        to: new Date('2022-12-31'),
        total: 1
      },
      {
        userId: 2,
        companyName: 'Company B',
        from: new Date('2021-01-01'),
        to: new Date('2021-12-31'),
        total: 1
      }
      // Add more service records here
    ]
  });

  // Create PromotionHistory for Users
  await prisma.promotionHistory.createMany({
    data: [
      {
        userId: 1,
        date: new Date('2022-05-15'),
        designation: 1 // Replace with the actual designation ID
      },
      {
        userId: 2,
        date: new Date('2023-02-20'),
        designation: 2 // Replace with the actual designation ID
      }
      // Add more promotion history entries here
    ]
  });

  // Create AchievementHistory for Users
  await prisma.achievementHistory.createMany({
    data: [
      {
        userId: 1,
        title: 'Achievement 1',
        description: 'Description for Achievement 1',
        date: new Date('2022-07-10')
      },
      {
        userId: 2,
        title: 'Achievement 2',
        description: 'Description for Achievement 2',
        date: new Date('2023-01-05')
      }
      // Add more achievement history entries here
    ]
  });

  // Create Projects
  const projects = await prisma.project.createMany({
    data: [
      { name: 'Project 1' },
      { name: 'Project 2' }
      // Add more projects here
    ]
  });

  // Create UserProjects (Link Users to Projects)
  await prisma.userProject.createMany({
    data: [
      {
        userId: 1,
        projectId: 1,
        currentDate: new Date(),
        updatedDate: new Date()
      },
      {
        userId: 2,
        projectId: 2,
        currentDate: new Date(),
        updatedDate: new Date()
      }
      // Add more UserProject entries here
    ]
  });

  console.log('Dummy data inserted successfully.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
