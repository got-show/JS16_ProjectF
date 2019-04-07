### How do we predict likelihood of death?

## We use Machine Learning

[Machine Learning](https://en.wikipedia.org/wiki/Machine_learning) is a technique that allows computers to make predictions for us. Machine Learning is not magic! Instead, it learns from a sufficiently large number of examples from the past to automatically compile statistics on them and to predict whether an event is likely to happen in the future. 

The _Song of Ice and Fire_ series is known for killing many characters, including prominent ones. While only fewest characters die of an old age, the majority meets a violent end. Does the death come at random or does it come to only those selected ones who exhibit similar features? The features can be certain age, heritage and gender. It can also be the fascinating ability of likely-to-die characters to make similar, mostly wrong, fateful decisions in their lives. 

In this project, we wanted to find features that are common to all already dead characters and use these features to predict the percentage likelihood of death (PLOD) for yet alive characters, aka to answer the question - who is likely to die next?

## Data extraction

 [The Wiki of Ice and Fire](http://awoiaf.westeros.org) and [Game of Thrones Wiki](https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki) are probably the best resources that summarize information from all 5 books and 8 seasons about each of ~2000 characters. For each character, we extracted from the wiki information about whether the character is dead or not. We also extracted other information  (i.e. features) that describe a character.

After this step, we had a data set describing each character - dead or alive - by exactly the same features. Our next task was to find the feature set that can best distinguish dead from alive characters.

## Bayesean Survival Analysis

Our first model aims to use techniques related to Bayesean Inference to examine the relationship of different features to a character’s longevity, similarly to how scientific studies might examine the effects of treatments and complications on cancer patients, or the correlations between seismic events.

The model’s assumptions go as follows: Every year of a character’s life, there is some base probability that this character will die. This base hazard is the same for all characters, and the presence or absence of certain properties is what causes some characters to be more likely to die than others. For example, being a man might raise your hazard by 60%, and being in House Lannister might lower it by 50. Accumulating this modified hazard allows us to build a survival function for any character. The survival function tells us, for a point in time, how likely it is that the character will not be dead by that point. So, for example, it might tell us that Jon Snow has a 45% probability to live until he’s 60, or that Jamie Lannister is deemed 60% likely to survive Season 8 of the show.

We train this model using MCMC simulation with the pymc3 package.

We selected the following features for our analysis:
*  House
*  Lovers
*  Marriage
*  Titles
*  Major/Minor character
*  Male

## Neural Network

Another approach we tested was to train a neural network to predict the probability for a character to die in any given year. Similarly to the Bayesean model, this also allows us to construct a survival function, but the neural network can potentially look for more complex patterns than the Bayesean model will. The neural network can also potentially encapsulate more "surprising” deaths that the Bayesean model might consider to be random outliers.

For this model, we used Python's Keras framework.

Basically, one of the easiest neural network architectures uses the Feed Forward technique. This means that the input is a vector with any number of real-valued dimensions, then it is processed via so-called "hidden layers" in between and the final output is a vector of numbers as well. Furthermore, a neural network consists of many parameters, which are adjusted during training. Training is the step in which these parameters are changed automatically, so they make the network output resemble the given input-output relation as closely as possible.

We now had to think about how to transform the complex information associated to a character into a vector. Some information is scalar, for example a character's page rank in the wiki or its number of relationships. Other information, for example the episodes the character appears in, has a set of pre-defined values. Thus, we can create a vector with as many dimensions as there are episodes and set a dimension to 1.0 if the character appears in the respective episode and to 0.0 otherwise. This way, different kinds of information can be transformed into vectors and these vectors are just appended to each other. In the end, we had 1561 input dimensions for the book data and 411 for the show data. For reference, these are the types of data we used:

*  book: gender, page rank, number of relatives, age, culture, house, region of house, allegiances, books the character was part of, locations, titles
*  show: gender, page rank, number of relatives, age, allegiances, episodes the character appeared in, titles

In general, becoming older is still the most important factor regarding a character's likelihood of death; after all, the older you are, the more danger you have been exposed to in the past! That's why the character's current age (as a one-hot vector like described before) is also part of the neural network input. Because the neural network output is just one dimension determining the "percentage likelihood of survival" as a number between 0 and 1, it is then possible to create about 90 different input vectors for a single character: one for each possible age. If the character was still alive by that age, the neural network shall predict 1.0 for that input vector, and 0.0 otherwise.

Additionally, this allows predicting transitions in the PLOS over time: modifying a character's input age is easy and directly relates to changes in PLOS. Finally, the percentage likelihood of death we display next to the character is just the PLOS at the year season 8 will take place in, subtracted from 1.0.

To wrap this up, let's look some statistics about the predictions and the neural network in general. First, the book wiki contained 484 usable characters in total, of which 188 were used for training (i.e. are already dead) and for the remaining 296 alive ones, predictions were created. In the end, training on the book data reached a 88.75% accuracy, compared to a final validation accuracy of 89.92%. Similarly, 146 usable characters could be extracted from the show wiki, 82 for training and 64 for predictions. The final training accuracy here was 79.64%, the final validation accuracy 85.69%.

## Citations

This article contains content from the Javascript Technology 2016 Seminar

Bayesean Survival Analysis Model: [Link](https://docs.pymc.io/notebooks/survival_analysis.html) (last visited 05.04.2019)

PyMC3: [Link](https://docs.pymc.io/) (last visited 05.04.2019)

Keras: [Link](https://keras.io/) (last visited 05.04.2019)