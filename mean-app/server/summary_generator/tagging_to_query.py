import nltk
from collections import defaultdict
import gen_summary
import sys

def generate_pos(sentence):
	return nltk.pos_tag(sentence)

def findtags(tag_prefix, tagged_text):
    cfd = nltk.ConditionalFreqDist((tag, word) for (word, tag) in tagged_text if tag.startswith(tag_prefix))
    return dict((tag, cfd[tag].most_common(5)) for tag in cfd.conditions())

def find_count_of_tags(tagged_text):
	tag_to_count = defaultdict(int)
	for item in tagged_text:
		tag_to_count[item[1]] += 1
	return tag_to_count

def find_tag_to_words(tagged_text):
	tag_to_words = defaultdict(list)
	for item in tagged_text:
		tag_to_words[item[1]].append(item[0])
	return tag_to_words

def generate_default_query(tagged_text, tag_to_count, tag_to_words):
	sorted_list = sorted(tag_to_count.items(), key=lambda x: x[1], reverse=True)
	return ' '.join(tag_to_words[sorted_list[0][0]])


def match_rules(tagged_text):
	tag_to_count = find_count_of_tags(tagged_text)
	tag_to_words = find_tag_to_words(tagged_text)
	if 'NN' in tag_to_count and tag_to_count['NN'] >= 3:
		query = tag_to_words['NN'][0] + ' ' + tag_to_words['NN'][1] + ' ' + tag_to_words['NN'][2]
	elif 'NNP' in tag_to_count and 'VBN' in tag_to_count and 'NNS' in tag_to_count and 'JJ' in tag_to_count and 'NN' in tag_to_count:
		query = tag_to_words['NNP'][0] + ' ' + tag_to_words['VBN'][0] + ' ' + tag_to_words['NNS'][0] + ' ' + tag_to_words['JJ'][0] + ' ' + tag_to_words['NN'][0]
	elif 'JJ' in tag_to_count and 'NN' in tag_to_count and 'NNS' in tag_to_count:
		query = tag_to_words['JJ'][0] + ' ' + tag_to_words['NN'][0] + ' ' + tag_to_words['NNS'][0]
	elif 'NNP' in tag_to_count and 'NN' in tag_to_count and 'NNP' in tag_to_count and 'NN' in tag_to_count and 'IN' in tag_to_count and 'NNP' in tag_to_count:
		query = tag_to_words['NNP'][0] + ' ' + tag_to_words['NN'][0] + ' ' + tag_to_words['NNP'][0] + ' ' + tag_to_words['NN'][0] + ' ' + tag_to_words['IN'][0] + ' ' + tag_to_words['NNP'][0]
	elif 'VBG' in tag_to_count and 'NNS' in tag_to_count and 'VBP' in tag_to_count and 'IN' in tag_to_count and 'NNS' in tag_to_count:
		query = tag_to_words['VBG'][0] + ' ' + tag_to_words['NNS'][0] + ' ' + tag_to_words['VBP'][0] + ' ' + tag_to_words['IN'][0] + ' ' + tag_to_words['NNS'][0]
 	else:
 		query = generate_default_query(tagged_text, tag_to_count, tag_to_words)
 	return query

def generate_search_strings(url): 
	sentences_array = gen_summary.generate_summary_from_url_without_json(url)
	queries_array = []
	for sentence in sentences_array:
		tagged_text = generate_pos(sentence.split(' '))
		queries_array.append(match_rules(tagged_text))
	return queries_array


if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(generate_search_strings(sys.argv[1]))
        sys.stdout.flush()
        sys.exit(0)
    print('Usage summarize.py <URL>')
    sys.exit(1)
