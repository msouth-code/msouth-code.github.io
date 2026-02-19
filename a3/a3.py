import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the CSV file
# Replace 'data.csv' with your actual CSV file path
df = pd.read_csv('weather.csv')
filtered_df = df.loc[(df['Date.Year'] == 2016) & (df['Station.City'] == "Juneau")]
filtered_df2 = df.loc[(df['Date.Year'] == 2016) & (df['Station.City'] == "Los Angeles")]
# filtered_df2 = df.loc[(df['Time.Year'] == 2012)]

# Create a figure and axis
plt.figure(figsize=(10, 6))

# Create box plot
# Adjust the x and y parameters to match your CSV column names
# sns.boxplot(data=filtered_df, x='Airport.Code', y='Statistics.Flights.Cancelled')
sns.histplot(filtered_df, x='Data.Temperature.Avg Temp', binwidth=3)
# Customize the plot
plt.title('Weekly Average Temp in Juneau, AK in 2016', fontsize=16, fontweight='bold')
plt.xlabel('Weekly Average Temp', fontsize=12)
plt.ylabel('Count', fontsize=12)
plt.xticks(rotation=45)
plt.tight_layout()

plt.show()

sns.boxplot(filtered_df2, x='Data.Temperature.Max Temp')
# Customize the plot
plt.title('Weekly Max Temp in Los Angeles, CA in 2016', fontsize=16, fontweight='bold')
plt.xlabel('Weekly Max Temp', fontsize=12)
# plt.ylabel('Count', fontsize=12)
plt.xticks(rotation=45)
plt.tight_layout()

plt.show()

sns.stripplot(data=filtered_df2, x='Data.Temperature.Avg Temp')

plt.title('Weekly Average Temp in Los Angeles, CA in 2016', fontsize=16, fontweight='bold')
plt.xlabel('Weekly Average Temp', fontsize=12)
# plt.ylabel('Flights Cancelled', fontsize=12)
plt.xticks(rotation=45)
plt.tight_layout()

# Display the plot
plt.show()

# Optional: Save the plot
# plt.savefig('box_plot.png', dpi=300, bbox_inches='tight')

sns.ecdfplot(data=filtered_df2, x="Data.Temperature.Max Temp")
plt.title('Weekly Max Temp in Los Angeles, CA in 2016', fontsize=16, fontweight='bold')
plt.xlabel('Weekly Max Temp', fontsize=12)
plt.show()