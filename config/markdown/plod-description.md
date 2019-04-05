## How do we predict likelihood of death?

### We use Machine Learning

[Machine Learning](https://en.wikipedia.org/wiki/Machine_learning) is a technique that allows computers to make predictions for us. Machine Learning is not magic! Instead, it learns from a sufficiently large number of examples from the past to automatically compile statistics on them and to predict whether an event is likely to happen in the future. 

The _Song of Ice and Fire_ series is known for killing many characters, including prominent ones. While only fewest characters die of an old age, the majority meets a violent end. Does the death come at random or does it come to only those selected ones who exhibit similar features? The features can be certain age, heritage and gender. It can also be the fascinating ability of likely-to-die characters to make similar, mostly wrong, fateful decisions in their lives. 

In this project, we wanted to find features that are common to all already dead characters and use these features to predict the percentage likelihood of death (PLOD) for yet alive characters, aka to answer the question - who is likely to die next?

### Data extraction

 [The Wiki of Ice and Fire](http://awoiaf.westeros.org) and [Game of Thrones Wiki](https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki) are probably the best resources that summarize information from all 5 books and 8 seasons about each of ~2000 characters. For each character, we extracted from the wiki information about whether the character is dead or not. We also extracted other information  (i.e. features) that describe a character.

After this step, we had a data set describing each character - dead or alive - by exactly the same features. Our next task was to find the feature set that can best distinguish dead from alive characters.

### Bayesean Survival Analysis
Our first model aims to use techniques related to Bayesean Inference to examine the relationship of different features to a character’s longevity, similarly to how scientific studies might examine the effects of treatments and complications on cancer patients, or the correlations between seismic events.

The model’s assumptions go as follows: Every year of a character’s life, there is some base probability that this character will die. This base hazard is the same for all characters, and the presence or absence of certain properties is what causes some characters to be more likely to die than others. For example, being a man might raise your hazard by 60%, and being in House Lannister might lower it by 50. Accumulating this modified hazard allows us to build a survival function for any character. The survival function tells us, for a point in time, how likely it is that the character will not be dead by that point. So, for example, it might tell us that Jon Snow has a 45% probability to live until he’s 60, or that Jamie Lannister is deemed 60% likely to survive Season 8 of the show.

We train this model using MCMC simulation with the pymc3 package.

We selected the following features for our analysis:
* House
* Lovers
* Marriage
* Titles
* Major/Minor character
* Male

### Neural Network
Another approach we tested was to train a neural network to predict the probability for a character to die in any given year. Similarly to the Bayesean model, this also allows us to construct a survival function, but the neural network can potentially look for more complex patterns than the Bayesean model will. The neural network can also potentially encapsulate more “surprising” deaths that the Bayesean model might consider to be random outliers.

For this model, we used Python’s Keras framework.

### Citations
This article contains content from the Javascript Technology 2016 Seminar: (2012 project insert here)

Bayesean Survival Analysis Model: https://docs.pymc.io/notebooks/survival_analysis.html (last visited 05.04.2019)

PyMC3: https://docs.pymc.io/ (last visited 05.04.2019)

Keras: https://keras.io/ (last visited 05.04.2019)

