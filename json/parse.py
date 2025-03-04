import csv
# 1) First create a file called index.csv with all the sponsor information
# https://docs.google.com/spreadsheets/d/1XMqLd9dq0HsruifPWRqgd2Ck9p-olfVhhk3ivXg7Co0/edit#gid=0
# 2) Next copy all the perks.js into the main.js

perks = open("./js/perks.js","w")
with open('./json/index.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    indexToTier = {}
    perkstowrite = []
    for ind, line in enumerate(csv_reader):
        print(ind, line)
        if (ind == 0):
            for i in range(4, len(line)):
                indexToTier[i] = line[i]
            continue
        perkstowrite.append(line)
    perks.write("var tiers = {")
    for ind, key in enumerate(indexToTier):
        perks.write(f"\"{indexToTier[key]}\": {key}")
        if(ind != len(indexToTier) - 1):
            perks.write(',')
    perks.write("};\n")
    perks.write("var perks = [\n")
    for i, p in enumerate(perkstowrite):
        perks.write(str(p))
        if(i != len(perkstowrite) - 1):
            perks.write(",")
        perks.write("\n")
perks.write("];")

# TYPE,SHORTNAME,PARENT,DEFAULT,Bronze,Silver,Gold,Platinum,Diamond