import nltk

def generate_search_strings():
	pass

def generate_pos(sentence):
	return nltk.pos_tag(sentence)

def findtags(tag_prefix, tagged_text):
    cfd = nltk.ConditionalFreqDist((tag, word) for (word, tag) in tagged_text if tag.startswith(tag_prefix))
    return dict((tag, cfd[tag].most_common(5)) for tag in cfd.conditions())




a = t.split(a)

nltk.pos_tag(a)

