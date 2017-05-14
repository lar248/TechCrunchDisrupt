import summarize
import sys
import nltk
import json

def replace_unwanted_chars(text):
	text = text.encode('ascii', 'ignore')
	unwanted_chars = ['\x80', '\x9d', '\x99s', '\x9c', '\x9d', '\x99t', '\x99', '\x98', '\xe2', '\x98', '\x94', '0x80', '\n', '\u2019s', '\u2019c', '\u2019d', '\u201d', '\u201c', '\u201s']
	for unwanted_chr in  unwanted_chars:
		text = text.replace(unwanted_chr, '')
	return text


def generate_summary_from_url(url):
	url = str(url)
	first_para, last_para = summarize.get_first_and_last_para(url)
	summary = unicode(first_para) + '\n ' + unicode(summarize.summarize_page(url))  + '\n ' + unicode(last_para)
	final_summary = replace_unwanted_chars(summary)
	return json.dumps(nltk.sent_tokenize(final_summary))
	

def generate_summary_from_text(text):
	text = unicode(text)
	return replace_unwanted_chars(str(summarize.summarize_text(text)))


if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(generate_summary_from_url(sys.argv[1]))
        sys.stdout.flush()
        sys.exit(0)
    print('Usage summarize.py <URL>')
    sys.exit(1)



