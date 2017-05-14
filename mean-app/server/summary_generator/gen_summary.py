import summarize
import sys

def replace_unwanted_chars(text):
	unwanted_chars = ['\x80', '\x9d', '\x99s', '\x9c', '\x9d', '\x99t', '\x99', '\x98', '\xe2', '\x98', '\x94', '0x80', '\n']
	for unwanted_chr in  unwanted_chars:
		text = text.replace(unwanted_chr, '')
	return text


def generate_summary_from_url(url):
	url = str(url)
	first_para, last_para = summarize.get_first_and_last_para(url)
	return  str(first_para) + '\n ' + str(summarize.summarize_page(url))  + '\n ' + str(last_para)
	
def generate_summary_from_text(text):
	text = str(text)
	return replace_unwanted_chars(str(summarize.summarize_text(text)))


if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(generate_summary_from_url(sys.argv[1]))
        sys.stdout.flush()
        sys.exit(0)
    print('Usage summarize.py <URL>')
    sys.exit(1)



