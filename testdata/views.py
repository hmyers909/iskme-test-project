# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

import csv
import json

import os

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

def parse_json():
    csv_file = open(os.path.join(PROJECT_ROOT, 'test-data.csv'))
    field_names = ("STANDARD","GRADE","END_GRADE","LEARNING_DOMAIN", "FULL_CODE", "DESCRIPTION")
    reader = csv.DictReader(csv_file, field_names)
    first_line_is_a_fieldname = True
    output = []
    for row in reader:
        if first_line_is_a_fieldname:
            first_line_is_a_fieldname = False
            continue
        output.append({
            'name': row["STANDARD"],
            "definitions": [
                {
                    "name": row["GRADE"],
                    "description": ""
                },
                {
                    "name": row["LEARNING_DOMAIN"],
                    "description": ""
                },
                {
                    "name": row["FULL_CODE"],
                    "description": row["DESCRIPTION"]
                }
            ]
        })
    return output


def get_standards(request):
    testdata=parse_json()
    from django.http import JsonResponse
    standard_data = {standard['name'] for standard in testdata}
    print(testdata)
    r = JsonResponse(list(standard_data), safe=False, )
    r['Access-Control-Allow-Origin'] = "*"
    return r


def get_grades(request):
    testdata=parse_json()
    from django.http import JsonResponse
    standard_value = request.GET.get('standard', '')
    standard_filter = [standard for standard in testdata if standard['name'] == standard_value]
    grade_data = {data['definitions'][0]['name'] for data in standard_filter}
    print(standard_filter)
    r = JsonResponse(list(grade_data), safe=False)
    r['Access-Control-Allow-Origin'] = "*"
    return r


def get_learning_domains(request):
    testdata=parse_json()
    from django.http import JsonResponse
    standard_value = request.GET.get('standard', '')
    grade_value = request.GET.get('grade', '')
    standard_filter = [standard for standard in testdata if standard['name'] == standard_value]
    grade_filter = [data for data in standard_filter if data['definitions'][0]['name'] == grade_value]
    learning_domain_data = {data['definitions'][1]['name'] for data in grade_filter}
    r = JsonResponse(list(learning_domain_data), safe=False)
    r['Access-Control-Allow-Origin'] = "*"
    return r


def get_full_codes(request):
    testdata=parse_json()
    from django.http import JsonResponse
    standard_value = request.GET.get('standard', '')
    grade_value = request.GET.get('grade', '')
    learning_domain_value = request.GET.get('learning_domain', '')
    standard_filter = [standard for standard in testdata if standard['name'] == standard_value]
    grade_filter = [data for data in standard_filter if data['definitions'][0]['name'] == grade_value]
    learning_domain_filter = [data for data in grade_filter if data['definitions'][1]['name'] == learning_domain_value]
    full_code_data = [data['definitions'][2] for data in learning_domain_filter]
    r = JsonResponse(full_code_data, safe=False)
    r['Access-Control-Allow-Origin'] = "*"
    return r

def get_descriptions(request):
    testdata=parse_json()
    from django.http import JsonResponse
    standard_value = request.GET.get('standard', '')
    grade_value = request.GET.get('grade', '')
    learning_domain_value = request.GET.get('learning_domain', '')
    standard_filter = [standard for standard in testdata if standard['name'] == standard_value]
    grade_filter = [data for data in standard_filter if data['definitions'][0]['name'] == grade_value]
    learning_domain_filter = [data for data in grade_filter if data['definitions'][1]['name'] == learning_domain_value]
    full_code_description = [data['definitions'][2]['description'] for data in learning_domain_filter]
    r = JsonResponse(full_code_description, safe=False)
    r['Access-Control-Allow-Origin'] = "*"
    return r