#include <iostream>

using namespace std;

void swap(int *x, int *y)
{
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;
}

void print(int *d, int n)
{
    for (size_t i = 0; i < n; i++)
    {
        cout << d[i];
    }

    cout << endl;
}

void permute(int *d, int s, int e)
{
    if (e == s)
    {
        print(d, 4);
    }
    else
    {
        for (int i = s; i < e; i++)
        {
            swap(d[s], d[i]);
            permute(d, s + 1, e);
            swap(d[s], d[i]);
        }
    }
}

void permuteLastDigit(int *d, int n)
{
    //cout << s;
    print(d, n);
    for (int i = n; i >= 2; i--)
    {
        swap(d[i - 1], d[i - 2]);
        print(d, n);
    }
}

void permute1(int *d, int n,int k)
{
    for (size_t i = 0; i < n - 1; i++)
    {
        permuteLastDigit(d, n);
        swap(d[0], d[n - 1]);
    }

    if(k){
        swap(d[k-1], d[k-2]);
        permute1(d, n,k-1);
    }
}

int main()
{
    int d[] = {1, 2, 3, 4};
    int n = 4;

    permute1(d, n, n-1);


    return 0;
}